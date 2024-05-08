package gongleaflet

import "embed"

// NgDistNg is the export of angular distribution. This allows
// embedding of the pages in the web server
//
//go:embed ng-github.com-fullstack-lang-gongleaflet/dist/ng-github.com-fullstack-lang-gongleaflet
var NgDistNg embed.FS
