
#
# This file is the default set of rules to compile a Pebble project.
#
# Feel free to customize this to your needs.
#

import os.path
try:
    from sh import CommandNotFound, jshint, cat, ErrorReturnCode_2
    hint = jshint
except (ImportError, CommandNotFound):
    hint = None

top = '.'
out = 'build'

def options(ctx):
    ctx.load('pebble_sdk')

def configure(ctx):
    ctx.load('pebble_sdk')
    global hint
    if hint is not None:
        hint = hint.bake(['--config', 'pebble-jshintrc'])

def build(ctx):
    if False and hint is not None:
        try:
            hint([node.abspath() for node in ctx.path.ant_glob("src/**/*.js")], _tty_out=False) # no tty because there are none in the cloudpebble sandbox.
        except ErrorReturnCode_2 as e:
            ctx.fatal("\nJavaScript linting failed (you can disable this in Project Settings):\n" + e.stdout)

	# Generate appinfo.h
	ctx(rule=generate_appinfo_h, source='appinfo.json', target='../src/generated/appinfo.h')

	# Generate keys.h
	ctx(rule=generate_keys_h, source='src/keys.json', target='../src/generated/keys.h')

	# Generate keys.js
	ctx(rule=generate_keys_js, source='src/keys.json', target='../src/js/src/generated/keys.js')

    # Concatenate all our JS files (but not recursively), and only if any JS exists in the first place.
    ctx.path.make_node('src/js/').mkdir()
    js_paths = ctx.path.ant_glob(['src/*.js', 'src/**/*.js'])
    if js_paths:
        ctx(rule='cat ${SRC} > ${TGT}', source=js_paths, target='pebble-js-app.js')
        has_js = True
    else:
        has_js = False

    ctx.load('pebble_sdk')

    ctx.pbl_program(source=ctx.path.ant_glob('src/**/*.c'),
                    target='pebble-app.elf')

    if os.path.exists('worker_src'):
        ctx.pbl_worker(source=ctx.path.ant_glob('worker_src/**/*.c'),
                        target='pebble-worker.elf')
        ctx.pbl_bundle(elf='pebble-app.elf',
                        worker_elf='pebble-worker.elf',
                        js='pebble-js-app.js' if has_js else [])
    else:
        ctx.pbl_bundle(elf='pebble-app.elf',
                       js='pebble-js-app.js' if has_js else [])

def generate_appinfo_h(task):
	src = task.inputs[0].abspath()
	target = task.outputs[0].abspath()
	appinfo = json.load(open(src))
	f = open(target, 'w')
	f.write('#pragma once\n\n')
	f.write('#define VERSION_LABEL "{0}"\n'.format(appinfo['versionLabel']))
	f.write('#define UUID "{0}"\n'.format(appinfo['uuid']))
	for key in appinfo['appKeys']:
		f.write('#define APP_KEY_{0} {1}\n'.format(key.upper(), appinfo['appKeys'][key]))
	f.close()

def generate_keys_h(task):
	src = task.inputs[0].abspath()
	target = task.outputs[0].abspath()
	keys = json.load(open(src))
	f = open(target, 'w')
	f.write('#pragma once\n\n')
	for key in keys:
		f.write('enum {\n')
		for key2 in keys[key]:
			f.write('\tKEY_{0}_{1},\n'.format(key, key2))
		f.write('};\n')
	f.close()
	
def generate_keys_js(task):
	src = task.inputs[0].abspath()
	target = task.outputs[0].abspath()
	keys = json.load(open(src))
	f = open(target, 'w')
	for key in keys:
		f.write('var {0} = {{'.format(key))
		i = 0
		for key2 in keys[key]:
			if i > 0: f.write(',')
			f.write('\n\t{0}: {1}'.format(key2, i))
			i += 1
		f.write('\n};\n')
	f.close()
