from __future__ import with_statement

import os

from fabric.api import *


# fab run_208 publish_208  -f ./publish.py
@task
def run_208():
    env.hosts = ['119.45.142.60']
    env.user = 'root'

@task
def publish_208():
    NGNIX_PATH_208 = '/root/nginx/www/html/sxkj-echarts'

    local('npm run build')
    local('tar cvzf dist.tgz dist')
    with cd(NGNIX_PATH_208):
        sudo('rm -rf ./*')
        put('dist.tgz', 'dist.tgz')
        run('tar xvf dist.tgz')
        run('mv dist/* .')
        run('rm -rf dist.tgz dist')
    local('rm -rf publish.pyc dist.tgz')


