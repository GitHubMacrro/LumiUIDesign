import {build} from 'esbuild';
await build({entryPoints:['src/main.jsx'],bundle:true,outdir:'dist',entryNames:'app',minify:true,legalComments:'linked',loader:{'.woff2':'file'},define:{'process.env.NODE_ENV':'"production"'},target:['chrome110'],logLevel:'info'});
