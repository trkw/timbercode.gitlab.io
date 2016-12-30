# timbercode.gitlab.io

Website of Timbercode company:
 [timbercode.gitlab.io/]( http://timbercode.gitlab.io/ )

## How to build?

### Prerequisites

Timbercode website is built on top of
 [Jekyll]( https://jekyllrb.com/ ) which means that for
 development you need Ruby v2 or above.
 
To install Ruby gems required to start, run:
* `./setup.sh`
 
Sample working versions of them are:
* bundler `1.13.7`
* gem `2.6.8`
* html-proofer `3.4.0`
* jekyll `3.3.1`
* ruby `2.4.0`

### Development

1. `./serve.sh` - build site into `public/` directory,
   serve it on [127.0.0.1:4321]( http://127.0.0.1:4321/ ),
   and open in a default browser, then watch for changes

### Build

1. `./build.sh` - build site into `public/` directory
2. `./test.sh` - test built site

## Acknowledgement

This site is based on [Hagura theme]( https://github.com/sharu725/hagura )
 from [Webjeda]( https://blog.webjeda.com/ ).

## TODO

* favicon
* first post :-P
* excerpt separator ( https://jekyllrb.com/docs/posts/#post-excerpts )
* specific author ( https://jekyllrb.com/docs/datafiles/#example-accessing-a-specific-author )
* config clean-up
* clean-up after applying Hagura theme
* do I need jekyll-seo-tag plugin?
* do I need jekyll-paginate plugin?