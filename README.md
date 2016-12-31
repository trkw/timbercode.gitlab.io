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
2. Go to [/admin]( http://127.0.0.1:4321/admin ) to access
   admin panel for easy posts edition.
   
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
* do I need jekyll-paginate plugin?
* read and apply official Disqus instruction for Jekyll
  https://timbercode.disqus.com/admin/install/platforms/jekyll/
* static pages and menu
* remove theme mode switcher
* google verificatin in SEO tag properties
* update google analytics code, if needed
* update disqus code, if needed