package main

import (
	"time"

	"github.com/fullstack-lang/gongleaflet/go/models"

	// injection point for ident package import declaration{{ImportPackageDeclaration}}
)

// generated in order to avoid error in the package import
// if there are no elements in the stage to marshall
var ___dummy__Stage_stage models.StageStruct
var ___dummy__Time_stage time.Time

// Injection point for meta package dummy declaration{{ImportPackageDummyDeclaration}}

// currently, DocLink renaming is not enabled in gopls
// the following map are devised to overcome this limitation
// those maps and the processing code will be eleminated when
// DocLink renaming will be enabled in gopls
// [Corresponding Issue](https://github.com/golang/go/issues/57559)
//
// When parsed, those maps will help with the renaming process
var map_DocLink_Identifier_stage map[string]any = map[string]any{
	// injection point for docLink to identifiers{{EntriesDocLinkStringDocLinkIdentifier}}
}

// init might be handy if one want to have the data embedded in the binary
// but it has to properly reference the Injection gateway in the main package
// func init() {
// 	_ = __Dummy_time_variable
// 	InjectionGateway["stage"] = stageInjection
// }

// stageInjection will stage objects of database "stage"
func stageInjection(stage *models.StageStruct) {

	// Declaration of instances to stage

	// Declarations of staged instances of Circle
	__Circle__000000_Lyon_s_Radar_Range := (&models.Circle{Name: `Lyon's Radar Range`}).Stage(stage)
	__Circle__000001_Lyon_s_Radar_Range := (&models.Circle{Name: `Lyon's Radar Range`}).Stage(stage)

	// Declarations of staged instances of DivIcon
	__DivIcon__000000_Airplane := (&models.DivIcon{Name: `Airplane`}).Stage(stage)
	__DivIcon__000001_Airplane := (&models.DivIcon{Name: `Airplane`}).Stage(stage)
	__DivIcon__000002_Airport := (&models.DivIcon{Name: `Airport`}).Stage(stage)
	__DivIcon__000003_Airport := (&models.DivIcon{Name: `Airport`}).Stage(stage)
	__DivIcon__000004_Airport := (&models.DivIcon{Name: `Airport`}).Stage(stage)
	__DivIcon__000005_Airport := (&models.DivIcon{Name: `Airport`}).Stage(stage)
	__DivIcon__000006_Antena := (&models.DivIcon{Name: `Antena`}).Stage(stage)
	__DivIcon__000007_Antena := (&models.DivIcon{Name: `Antena`}).Stage(stage)
	__DivIcon__000008_Arrow := (&models.DivIcon{Name: `Arrow`}).Stage(stage)
	__DivIcon__000009_Arrow := (&models.DivIcon{Name: `Arrow`}).Stage(stage)
	__DivIcon__000010_Cross := (&models.DivIcon{Name: `Cross`}).Stage(stage)
	__DivIcon__000011_Cross := (&models.DivIcon{Name: `Cross`}).Stage(stage)
	__DivIcon__000012_Dot10 := (&models.DivIcon{Name: `Dot10`}).Stage(stage)
	__DivIcon__000013_Dot10 := (&models.DivIcon{Name: `Dot10`}).Stage(stage)
	__DivIcon__000014_DotBlur := (&models.DivIcon{Name: `DotBlur`}).Stage(stage)
	__DivIcon__000015_DotBlur := (&models.DivIcon{Name: `DotBlur`}).Stage(stage)
	__DivIcon__000016_Message := (&models.DivIcon{Name: `Message`}).Stage(stage)
	__DivIcon__000017_Message := (&models.DivIcon{Name: `Message`}).Stage(stage)
	__DivIcon__000018_Radar := (&models.DivIcon{Name: `Radar`}).Stage(stage)
	__DivIcon__000019_Radar := (&models.DivIcon{Name: `Radar`}).Stage(stage)
	__DivIcon__000020_Satellite := (&models.DivIcon{Name: `Satellite`}).Stage(stage)
	__DivIcon__000021_Satellite := (&models.DivIcon{Name: `Satellite`}).Stage(stage)

	// Declarations of staged instances of LayerGroup
	__LayerGroup__000000_Airport_Layer := (&models.LayerGroup{Name: `Airport Layer`}).Stage(stage)
	__LayerGroup__000001_Airport_Layer := (&models.LayerGroup{Name: `Airport Layer`}).Stage(stage)
	__LayerGroup__000002_Default := (&models.LayerGroup{Name: `Default`}).Stage(stage)
	__LayerGroup__000003_Default := (&models.LayerGroup{Name: `Default`}).Stage(stage)
	__LayerGroup__000004_Radar_Layer := (&models.LayerGroup{Name: `Radar Layer`}).Stage(stage)
	__LayerGroup__000005_Radar_Layer := (&models.LayerGroup{Name: `Radar Layer`}).Stage(stage)
	__LayerGroup__000006_Tracks_Layer := (&models.LayerGroup{Name: `Tracks Layer`}).Stage(stage)
	__LayerGroup__000007_Tracks_Layer := (&models.LayerGroup{Name: `Tracks Layer`}).Stage(stage)

	// Declarations of staged instances of LayerGroupUse
	__LayerGroupUse__000000_Map1AirportLayerUse := (&models.LayerGroupUse{Name: `Map1AirportLayerUse`}).Stage(stage)
	__LayerGroupUse__000001_Map1AirportLayerUse := (&models.LayerGroupUse{Name: `Map1AirportLayerUse`}).Stage(stage)
	__LayerGroupUse__000002_Map1RadarLayerUse := (&models.LayerGroupUse{Name: `Map1RadarLayerUse`}).Stage(stage)
	__LayerGroupUse__000003_Map1RadarLayerUse := (&models.LayerGroupUse{Name: `Map1RadarLayerUse`}).Stage(stage)
	__LayerGroupUse__000004_Map1TracksLayerUse := (&models.LayerGroupUse{Name: `Map1TracksLayerUse`}).Stage(stage)
	__LayerGroupUse__000005_Map1TracksLayerUse := (&models.LayerGroupUse{Name: `Map1TracksLayerUse`}).Stage(stage)
	__LayerGroupUse__000006_Map2RadarLayerUse := (&models.LayerGroupUse{Name: `Map2RadarLayerUse`}).Stage(stage)
	__LayerGroupUse__000007_Map2RadarLayerUse := (&models.LayerGroupUse{Name: `Map2RadarLayerUse`}).Stage(stage)
	__LayerGroupUse__000008_Map2RadarLayerUse := (&models.LayerGroupUse{Name: `Map2RadarLayerUse`}).Stage(stage)
	__LayerGroupUse__000009_Map2RadarLayerUse := (&models.LayerGroupUse{Name: `Map2RadarLayerUse`}).Stage(stage)
	__LayerGroupUse__000010_Map2TracksLayerUse := (&models.LayerGroupUse{Name: `Map2TracksLayerUse`}).Stage(stage)
	__LayerGroupUse__000011_Map2TracksLayerUse := (&models.LayerGroupUse{Name: `Map2TracksLayerUse`}).Stage(stage)

	// Declarations of staged instances of MapOptions
	__MapOptions__000000_Map1 := (&models.MapOptions{Name: `Map1`}).Stage(stage)
	__MapOptions__000001_Map1 := (&models.MapOptions{Name: `Map1`}).Stage(stage)
	__MapOptions__000002_Map2 := (&models.MapOptions{Name: `Map2`}).Stage(stage)
	__MapOptions__000003_Map2 := (&models.MapOptions{Name: `Map2`}).Stage(stage)

	// Declarations of staged instances of Marker
	__Marker__000000_Dot := (&models.Marker{Name: `Dot`}).Stage(stage)
	__Marker__000001_Dot := (&models.Marker{Name: `Dot`}).Stage(stage)
	__Marker__000002_Lyon_s_Airport := (&models.Marker{Name: `Lyon's Airport`}).Stage(stage)
	__Marker__000003_Lyon_s_Airport := (&models.Marker{Name: `Lyon's Airport`}).Stage(stage)
	__Marker__000004_Lyon_s_Radar := (&models.Marker{Name: `Lyon's Radar`}).Stage(stage)
	__Marker__000005_Lyon_s_Radar := (&models.Marker{Name: `Lyon's Radar`}).Stage(stage)

	// Declarations of staged instances of UserClick
	__UserClick__000000_Click_0 := (&models.UserClick{Name: `Click !0`}).Stage(stage)
	__UserClick__000001_Click_1 := (&models.UserClick{Name: `Click !1`}).Stage(stage)

	// Declarations of staged instances of VLine
	__VLine__000000_Test_line := (&models.VLine{Name: `Test line`}).Stage(stage)
	__VLine__000001_Test_line := (&models.VLine{Name: `Test line`}).Stage(stage)

	// Declarations of staged instances of VisualTrack
	__VisualTrack__000000_Plane_Track := (&models.VisualTrack{Name: `Plane Track`}).Stage(stage)
	__VisualTrack__000001_Plane_Track := (&models.VisualTrack{Name: `Plane Track`}).Stage(stage)
	__VisualTrack__000002_Sat_Track := (&models.VisualTrack{Name: `Sat Track`}).Stage(stage)
	__VisualTrack__000003_Sat_Track := (&models.VisualTrack{Name: `Sat Track`}).Stage(stage)

	// Setup of values

	// Circle values setup
	__Circle__000000_Lyon_s_Radar_Range.Lat = 46.000000
	__Circle__000000_Lyon_s_Radar_Range.Lng = 5.000000
	__Circle__000000_Lyon_s_Radar_Range.Name = `Lyon's Radar Range`
	__Circle__000000_Lyon_s_Radar_Range.Radius = 100.000000
	__Circle__000000_Lyon_s_Radar_Range.ColorEnum = models.LIGHT_BROWN_8D6E63
	__Circle__000000_Lyon_s_Radar_Range.DashStyleEnum = models.FIVE_TWENTY

	// Circle values setup
	__Circle__000001_Lyon_s_Radar_Range.Lat = 46.000000
	__Circle__000001_Lyon_s_Radar_Range.Lng = 5.000000
	__Circle__000001_Lyon_s_Radar_Range.Name = `Lyon's Radar Range`
	__Circle__000001_Lyon_s_Radar_Range.Radius = 100.000000
	__Circle__000001_Lyon_s_Radar_Range.ColorEnum = models.LIGHT_BROWN_8D6E63
	__Circle__000001_Lyon_s_Radar_Range.DashStyleEnum = models.FIVE_TWENTY

	// DivIcon values setup
	__DivIcon__000000_Airplane.Name = `Airplane`
	__DivIcon__000000_Airplane.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   id="Layer_1"
   x="0px"
   y="0px"
   viewBox="0 0 512 512"
   style="enable-background:new 0 0 400 400;"
   xml:space="preserve"><metadata
   id="metadata1524"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata>
  <defs
   id="defs4" />
  <g
   transform="translate(-147.06733,-109.44716)"
   id="g2998">
    <path
   d="M 157.98695,184.38488 L 173.37483,168.20017 C 182.38616,159.18884 197.56012,162.31477 197.56012,162.31477 L 242.58958,168.47612 L 265.39575,146.16045 C 277.41087,134.35989 288.26269,152.4142 283.54247,158.63631 L 271.83305,172.24635 L 320.32641,181.22794 L 336.78707,162.03882 C 354.38063,141.01237 367.47041,159.95529 359.53185,171.11218 L 348.89521,184.56906 L 421.75804,194.07153 C 484.40828,133.78139 509.98537,108.77262 526.46939,123.63021 C 543.05967,138.5836 513.71315,168.38877 456.64135,227.17701 L 467.00204,302.24678 L 482.26714,289.52597 C 491.27847,282.01653 507.27901,294.06392 490.75822,309.72648 L 469.76089,329.52825 L 478.61969,378.66527 L 491.73923,368.58052 C 503.32523,359.35463 517.39476,371.55518 501.7322,388.29052 L 480.88803,409.28786 C 480.02981,409.93153 487.69305,452.38631 487.69305,452.38631 C 492.41327,473.19821 480.67347,480.80195 480.67347,480.80195 L 466.35838,493.27782 L 411.97962,339.67439 C 407.47395,326.15738 396.0546,311.47862 376.97351,313.22076 C 366.8894,314.29354 341.41552,331.49026 337.98263,335.56682 L 279.00579,392.27531 C 277.5039,393.34809 288.07915,465.99635 288.07915,465.99635 C 288.07915,468.14191 269.38054,492.66454 269.38054,492.66454 L 232.01433,426.14725 L 213.56128,434.7301 L 224.35108,417.93211 L 157.06733,379.9526 L 182.29502,361.49956 C 194.31014,364.28878 257.3034,371.36975 258.59073,370.72608 C 258.59073,370.72608 309.88762,319.85344 312.81633,316.77643 C 329.76623,298.96831 335.46935,292.31456 338.04402,283.51778 C 340.6208,274.71377 336.23117,261.81195 309.62838,245.4769 C 272.93937,222.94855 157.98695,184.38488 157.98695,184.38488 z"
   id="path3166"
   style="fill:none;stroke:currentColor;stroke-width:25px;stroke-linejoin:round;opacity:0.49"
   transform="translate(55, 150) rotate(-45, 256, 256)" />
  </g>
</svg>
`

	// DivIcon values setup
	__DivIcon__000001_Airplane.Name = `Airplane`
	__DivIcon__000001_Airplane.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   id="Layer_1"
   x="0px"
   y="0px"
   viewBox="0 0 512 512"
   style="enable-background:new 0 0 400 400;"
   xml:space="preserve"><metadata
   id="metadata1524"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata>
  <defs
   id="defs4" />
  <g
   transform="translate(-147.06733,-109.44716)"
   id="g2998">
    <path
   d="M 157.98695,184.38488 L 173.37483,168.20017 C 182.38616,159.18884 197.56012,162.31477 197.56012,162.31477 L 242.58958,168.47612 L 265.39575,146.16045 C 277.41087,134.35989 288.26269,152.4142 283.54247,158.63631 L 271.83305,172.24635 L 320.32641,181.22794 L 336.78707,162.03882 C 354.38063,141.01237 367.47041,159.95529 359.53185,171.11218 L 348.89521,184.56906 L 421.75804,194.07153 C 484.40828,133.78139 509.98537,108.77262 526.46939,123.63021 C 543.05967,138.5836 513.71315,168.38877 456.64135,227.17701 L 467.00204,302.24678 L 482.26714,289.52597 C 491.27847,282.01653 507.27901,294.06392 490.75822,309.72648 L 469.76089,329.52825 L 478.61969,378.66527 L 491.73923,368.58052 C 503.32523,359.35463 517.39476,371.55518 501.7322,388.29052 L 480.88803,409.28786 C 480.02981,409.93153 487.69305,452.38631 487.69305,452.38631 C 492.41327,473.19821 480.67347,480.80195 480.67347,480.80195 L 466.35838,493.27782 L 411.97962,339.67439 C 407.47395,326.15738 396.0546,311.47862 376.97351,313.22076 C 366.8894,314.29354 341.41552,331.49026 337.98263,335.56682 L 279.00579,392.27531 C 277.5039,393.34809 288.07915,465.99635 288.07915,465.99635 C 288.07915,468.14191 269.38054,492.66454 269.38054,492.66454 L 232.01433,426.14725 L 213.56128,434.7301 L 224.35108,417.93211 L 157.06733,379.9526 L 182.29502,361.49956 C 194.31014,364.28878 257.3034,371.36975 258.59073,370.72608 C 258.59073,370.72608 309.88762,319.85344 312.81633,316.77643 C 329.76623,298.96831 335.46935,292.31456 338.04402,283.51778 C 340.6208,274.71377 336.23117,261.81195 309.62838,245.4769 C 272.93937,222.94855 157.98695,184.38488 157.98695,184.38488 z"
   id="path3166"
   style="fill:none;stroke:currentColor;stroke-width:25px;stroke-linejoin:round;opacity:0.49"
   transform="translate(55, 150) rotate(-45, 256, 256)" />
  </g>
</svg>
`

	// DivIcon values setup
	__DivIcon__000002_Airport.Name = `Airport`
	__DivIcon__000002_Airport.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   id="Capa_1"
   x="0px"
   y="0px"
   viewBox="0 0 479.68 479.68"
   style="enable-background:new 0 0 479.68 479.68;"
   xml:space="preserve"><metadata
   id="metadata898"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs896" />
<g
   id="g891">
	<g
   id="g889">
		<path
   d="M342.128,426v-98V120v-8h-0.408C337.576,49.56,285.592,0,222.128,0h-208c-4.416,0-8,3.584-8,8    c0,36.28,16.248,68.784,41.776,90.808c-6.376,17.008-9.776,34.848-9.776,53.192v144c0,4.416,3.584,8,8,8h32v80    c0,4.416,3.584,8,8,8h112v34L66.712,464.32l4.48,15.36l134.168-39.12l61.2,30.6c1.112,0.56,2.344,0.84,3.568,0.84    s2.456-0.28,3.576-0.84l61.2-30.6l134.168,39.12l4.48-15.36L342.128,426z M22.432,16h199.696c5.456,0,10.768,0.552,16,1.36V112    h-112C71.472,112,26.528,69.624,22.432,16z M246.128,168c26.472,0,48,21.528,48,48c0,2.864-0.304,5.656-0.784,8.384    c-0.056,0.304-0.08,0.608-0.136,0.904c-0.488,2.48-1.208,4.872-2.056,7.2c-0.192,0.528-0.368,1.072-0.584,1.592    c-0.848,2.096-1.88,4.104-3.008,6.04c-0.392,0.672-0.784,1.336-1.208,1.984c-1.144,1.76-2.4,3.432-3.752,5.024    c-0.568,0.664-1.16,1.312-1.768,1.944c-1.424,1.496-2.92,2.912-4.528,4.208c-0.632,0.512-1.304,0.992-1.968,1.472    c-1.768,1.288-3.6,2.504-5.552,3.544c-0.512,0.272-1.048,0.496-1.568,0.76c-2.232,1.088-4.528,2.08-6.944,2.816    c-0.184,0.056-0.376,0.088-0.56,0.144c-2.728,0.792-5.544,1.392-8.456,1.704h-0.008c-1.688,0.176-3.392,0.28-5.12,0.28    c-26.472,0-48-21.528-48-48S219.656,168,246.128,168z M326.128,427.056l-56,28l-56-28V384c0-4.416-3.584-8-8-8h-112v-80    c0-4.416-3.584-8-8-8h-32V152c0-14.84,2.48-29.304,7.144-43.192C80,120.896,102.232,128,126.128,128h112v24.552    c-31.52,3.96-56,30.872-56,63.448s24.48,59.488,56,63.448V320h-73.472c-3.312-9.288-12.112-16-22.528-16h-8    c-13.232,0-24,10.768-24,24s10.768,24,24,24h8c10.416,0,19.216-6.712,22.528-16h81.472c4.416,0,8-3.584,8-8v-35.048    c16.056,24.464,42.328,40.28,72,42.704V427.056z M150.128,328c0,4.408-3.592,8-8,8h-8c-4.408,0-8-3.592-8-8c0-4.408,3.592-8,8-8h8    C146.536,320,150.128,323.592,150.128,328z M326.128,319.608c-26.72-2.624-50.016-18.312-62.552-42.016    c0.368-0.104,0.712-0.24,1.072-0.352c0.432-0.128,0.856-0.28,1.288-0.416c1.608-0.52,3.176-1.096,4.72-1.728    c0.216-0.088,0.432-0.176,0.648-0.272c17.12-7.288,30.208-21.72,35.808-39.456c0.104-0.32,0.192-0.648,0.288-0.976    c0.456-1.528,0.856-3.072,1.2-4.648c0.112-0.528,0.232-1.048,0.336-1.584c0.28-1.456,0.496-2.936,0.68-4.424    c0.064-0.552,0.152-1.096,0.208-1.656c0.184-2,0.304-4.024,0.304-6.08c0-2.128-0.112-4.224-0.32-6.296    c-0.072-0.696-0.2-1.376-0.288-2.064c-0.176-1.36-0.36-2.728-0.624-4.064c-0.16-0.8-0.376-1.584-0.56-2.376    c-0.28-1.192-0.568-2.384-0.912-3.552c-0.248-0.824-0.544-1.624-0.816-2.432c-0.376-1.096-0.76-2.192-1.192-3.256    c-0.336-0.816-0.696-1.608-1.064-2.408c-0.464-1.024-0.944-2.032-1.456-3.024c-0.408-0.792-0.848-1.56-1.288-2.328    c-0.552-0.96-1.12-1.896-1.72-2.824c-0.48-0.752-0.984-1.48-1.496-2.208c-0.632-0.896-1.288-1.768-1.968-2.624    c-0.552-0.696-1.104-1.392-1.68-2.064c-0.72-0.84-1.464-1.64-2.224-2.44c-0.6-0.632-1.2-1.272-1.824-1.88    c-0.808-0.784-1.648-1.528-2.496-2.264c-0.64-0.56-1.272-1.136-1.936-1.672c-0.912-0.736-1.864-1.416-2.816-2.104    c-0.656-0.472-1.288-0.968-1.96-1.416c-1.072-0.712-2.192-1.36-3.304-2.008c-0.6-0.352-1.176-0.728-1.792-1.064    c-1.68-0.904-3.408-1.744-5.176-2.496c-0.072-0.032-0.136-0.072-0.208-0.096c-1.84-0.784-3.736-1.464-5.656-2.072    c-0.616-0.192-1.256-0.328-1.88-0.504c-1.328-0.376-2.656-0.744-4.016-1.04c-0.768-0.16-1.552-0.264-2.32-0.4    c-1-0.176-1.984-0.392-3-0.52V120V21.088c41.72,13.536,71.992,52.736,71.992,98.912V319.608z"
   style="fill:currentColor;stroke: currentColor; stroke-width: 15px;"
   id="path887" />
	</g>
</g>
</svg>
`

	// DivIcon values setup
	__DivIcon__000003_Airport.Name = `Airport`
	__DivIcon__000003_Airport.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px"
   viewBox="0 0 479.68 479.68" style="enable-background:new 0 0 479.68 479.68;" xml:space="preserve">
   <metadata id="metadata898">
      <rdf:RDF>
         <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
         </cc:Work>
      </rdf:RDF>
   </metadata>
   <defs id="defs896" />
   <g id="g891">
      <g id="g889">
         <path
            d="M342.128,426v-98V120v-8h-0.408C337.576,49.56,285.592,0,222.128,0h-208c-4.416,0-8,3.584-8,8    c0,36.28,16.248,68.784,41.776,90.808c-6.376,17.008-9.776,34.848-9.776,53.192v144c0,4.416,3.584,8,8,8h32v80    c0,4.416,3.584,8,8,8h112v34L66.712,464.32l4.48,15.36l134.168-39.12l61.2,30.6c1.112,0.56,2.344,0.84,3.568,0.84    s2.456-0.28,3.576-0.84l61.2-30.6l134.168,39.12l4.48-15.36L342.128,426z M22.432,16h199.696c5.456,0,10.768,0.552,16,1.36V112    h-112C71.472,112,26.528,69.624,22.432,16z M246.128,168c26.472,0,48,21.528,48,48c0,2.864-0.304,5.656-0.784,8.384    c-0.056,0.304-0.08,0.608-0.136,0.904c-0.488,2.48-1.208,4.872-2.056,7.2c-0.192,0.528-0.368,1.072-0.584,1.592    c-0.848,2.096-1.88,4.104-3.008,6.04c-0.392,0.672-0.784,1.336-1.208,1.984c-1.144,1.76-2.4,3.432-3.752,5.024    c-0.568,0.664-1.16,1.312-1.768,1.944c-1.424,1.496-2.92,2.912-4.528,4.208c-0.632,0.512-1.304,0.992-1.968,1.472    c-1.768,1.288-3.6,2.504-5.552,3.544c-0.512,0.272-1.048,0.496-1.568,0.76c-2.232,1.088-4.528,2.08-6.944,2.816    c-0.184,0.056-0.376,0.088-0.56,0.144c-2.728,0.792-5.544,1.392-8.456,1.704h-0.008c-1.688,0.176-3.392,0.28-5.12,0.28    c-26.472,0-48-21.528-48-48S219.656,168,246.128,168z M326.128,427.056l-56,28l-56-28V384c0-4.416-3.584-8-8-8h-112v-80    c0-4.416-3.584-8-8-8h-32V152c0-14.84,2.48-29.304,7.144-43.192C80,120.896,102.232,128,126.128,128h112v24.552    c-31.52,3.96-56,30.872-56,63.448s24.48,59.488,56,63.448V320h-73.472c-3.312-9.288-12.112-16-22.528-16h-8    c-13.232,0-24,10.768-24,24s10.768,24,24,24h8c10.416,0,19.216-6.712,22.528-16h81.472c4.416,0,8-3.584,8-8v-35.048    c16.056,24.464,42.328,40.28,72,42.704V427.056z M150.128,328c0,4.408-3.592,8-8,8h-8c-4.408,0-8-3.592-8-8c0-4.408,3.592-8,8-8h8    C146.536,320,150.128,323.592,150.128,328z M326.128,319.608c-26.72-2.624-50.016-18.312-62.552-42.016    c0.368-0.104,0.712-0.24,1.072-0.352c0.432-0.128,0.856-0.28,1.288-0.416c1.608-0.52,3.176-1.096,4.72-1.728    c0.216-0.088,0.432-0.176,0.648-0.272c17.12-7.288,30.208-21.72,35.808-39.456c0.104-0.32,0.192-0.648,0.288-0.976    c0.456-1.528,0.856-3.072,1.2-4.648c0.112-0.528,0.232-1.048,0.336-1.584c0.28-1.456,0.496-2.936,0.68-4.424    c0.064-0.552,0.152-1.096,0.208-1.656c0.184-2,0.304-4.024,0.304-6.08c0-2.128-0.112-4.224-0.32-6.296    c-0.072-0.696-0.2-1.376-0.288-2.064c-0.176-1.36-0.36-2.728-0.624-4.064c-0.16-0.8-0.376-1.584-0.56-2.376    c-0.28-1.192-0.568-2.384-0.912-3.552c-0.248-0.824-0.544-1.624-0.816-2.432c-0.376-1.096-0.76-2.192-1.192-3.256    c-0.336-0.816-0.696-1.608-1.064-2.408c-0.464-1.024-0.944-2.032-1.456-3.024c-0.408-0.792-0.848-1.56-1.288-2.328    c-0.552-0.96-1.12-1.896-1.72-2.824c-0.48-0.752-0.984-1.48-1.496-2.208c-0.632-0.896-1.288-1.768-1.968-2.624    c-0.552-0.696-1.104-1.392-1.68-2.064c-0.72-0.84-1.464-1.64-2.224-2.44c-0.6-0.632-1.2-1.272-1.824-1.88    c-0.808-0.784-1.648-1.528-2.496-2.264c-0.64-0.56-1.272-1.136-1.936-1.672c-0.912-0.736-1.864-1.416-2.816-2.104    c-0.656-0.472-1.288-0.968-1.96-1.416c-1.072-0.712-2.192-1.36-3.304-2.008c-0.6-0.352-1.176-0.728-1.792-1.064    c-1.68-0.904-3.408-1.744-5.176-2.496c-0.072-0.032-0.136-0.072-0.208-0.096c-1.84-0.784-3.736-1.464-5.656-2.072    c-0.616-0.192-1.256-0.328-1.88-0.504c-1.328-0.376-2.656-0.744-4.016-1.04c-0.768-0.16-1.552-0.264-2.32-0.4    c-1-0.176-1.984-0.392-3-0.52V120V21.088c41.72,13.536,71.992,52.736,71.992,98.912V319.608z"
            style="fill:currentColor;stroke: currentColor; stroke-width: 15px;" id="path887" />
      </g>
   </g>
</svg>`

	// DivIcon values setup
	__DivIcon__000004_Airport.Name = `Airport`
	__DivIcon__000004_Airport.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   id="Capa_1"
   x="0px"
   y="0px"
   viewBox="0 0 479.68 479.68"
   style="enable-background:new 0 0 479.68 479.68;"
   xml:space="preserve"><metadata
   id="metadata898"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs896" />
<g
   id="g891">
	<g
   id="g889">
		<path
   d="M342.128,426v-98V120v-8h-0.408C337.576,49.56,285.592,0,222.128,0h-208c-4.416,0-8,3.584-8,8    c0,36.28,16.248,68.784,41.776,90.808c-6.376,17.008-9.776,34.848-9.776,53.192v144c0,4.416,3.584,8,8,8h32v80    c0,4.416,3.584,8,8,8h112v34L66.712,464.32l4.48,15.36l134.168-39.12l61.2,30.6c1.112,0.56,2.344,0.84,3.568,0.84    s2.456-0.28,3.576-0.84l61.2-30.6l134.168,39.12l4.48-15.36L342.128,426z M22.432,16h199.696c5.456,0,10.768,0.552,16,1.36V112    h-112C71.472,112,26.528,69.624,22.432,16z M246.128,168c26.472,0,48,21.528,48,48c0,2.864-0.304,5.656-0.784,8.384    c-0.056,0.304-0.08,0.608-0.136,0.904c-0.488,2.48-1.208,4.872-2.056,7.2c-0.192,0.528-0.368,1.072-0.584,1.592    c-0.848,2.096-1.88,4.104-3.008,6.04c-0.392,0.672-0.784,1.336-1.208,1.984c-1.144,1.76-2.4,3.432-3.752,5.024    c-0.568,0.664-1.16,1.312-1.768,1.944c-1.424,1.496-2.92,2.912-4.528,4.208c-0.632,0.512-1.304,0.992-1.968,1.472    c-1.768,1.288-3.6,2.504-5.552,3.544c-0.512,0.272-1.048,0.496-1.568,0.76c-2.232,1.088-4.528,2.08-6.944,2.816    c-0.184,0.056-0.376,0.088-0.56,0.144c-2.728,0.792-5.544,1.392-8.456,1.704h-0.008c-1.688,0.176-3.392,0.28-5.12,0.28    c-26.472,0-48-21.528-48-48S219.656,168,246.128,168z M326.128,427.056l-56,28l-56-28V384c0-4.416-3.584-8-8-8h-112v-80    c0-4.416-3.584-8-8-8h-32V152c0-14.84,2.48-29.304,7.144-43.192C80,120.896,102.232,128,126.128,128h112v24.552    c-31.52,3.96-56,30.872-56,63.448s24.48,59.488,56,63.448V320h-73.472c-3.312-9.288-12.112-16-22.528-16h-8    c-13.232,0-24,10.768-24,24s10.768,24,24,24h8c10.416,0,19.216-6.712,22.528-16h81.472c4.416,0,8-3.584,8-8v-35.048    c16.056,24.464,42.328,40.28,72,42.704V427.056z M150.128,328c0,4.408-3.592,8-8,8h-8c-4.408,0-8-3.592-8-8c0-4.408,3.592-8,8-8h8    C146.536,320,150.128,323.592,150.128,328z M326.128,319.608c-26.72-2.624-50.016-18.312-62.552-42.016    c0.368-0.104,0.712-0.24,1.072-0.352c0.432-0.128,0.856-0.28,1.288-0.416c1.608-0.52,3.176-1.096,4.72-1.728    c0.216-0.088,0.432-0.176,0.648-0.272c17.12-7.288,30.208-21.72,35.808-39.456c0.104-0.32,0.192-0.648,0.288-0.976    c0.456-1.528,0.856-3.072,1.2-4.648c0.112-0.528,0.232-1.048,0.336-1.584c0.28-1.456,0.496-2.936,0.68-4.424    c0.064-0.552,0.152-1.096,0.208-1.656c0.184-2,0.304-4.024,0.304-6.08c0-2.128-0.112-4.224-0.32-6.296    c-0.072-0.696-0.2-1.376-0.288-2.064c-0.176-1.36-0.36-2.728-0.624-4.064c-0.16-0.8-0.376-1.584-0.56-2.376    c-0.28-1.192-0.568-2.384-0.912-3.552c-0.248-0.824-0.544-1.624-0.816-2.432c-0.376-1.096-0.76-2.192-1.192-3.256    c-0.336-0.816-0.696-1.608-1.064-2.408c-0.464-1.024-0.944-2.032-1.456-3.024c-0.408-0.792-0.848-1.56-1.288-2.328    c-0.552-0.96-1.12-1.896-1.72-2.824c-0.48-0.752-0.984-1.48-1.496-2.208c-0.632-0.896-1.288-1.768-1.968-2.624    c-0.552-0.696-1.104-1.392-1.68-2.064c-0.72-0.84-1.464-1.64-2.224-2.44c-0.6-0.632-1.2-1.272-1.824-1.88    c-0.808-0.784-1.648-1.528-2.496-2.264c-0.64-0.56-1.272-1.136-1.936-1.672c-0.912-0.736-1.864-1.416-2.816-2.104    c-0.656-0.472-1.288-0.968-1.96-1.416c-1.072-0.712-2.192-1.36-3.304-2.008c-0.6-0.352-1.176-0.728-1.792-1.064    c-1.68-0.904-3.408-1.744-5.176-2.496c-0.072-0.032-0.136-0.072-0.208-0.096c-1.84-0.784-3.736-1.464-5.656-2.072    c-0.616-0.192-1.256-0.328-1.88-0.504c-1.328-0.376-2.656-0.744-4.016-1.04c-0.768-0.16-1.552-0.264-2.32-0.4    c-1-0.176-1.984-0.392-3-0.52V120V21.088c41.72,13.536,71.992,52.736,71.992,98.912V319.608z"
   style="fill:currentColor;stroke: currentColor; stroke-width: 15px;"
   id="path887" />
	</g>
</g>
</svg>
`

	// DivIcon values setup
	__DivIcon__000005_Airport.Name = `Airport`
	__DivIcon__000005_Airport.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px"
   viewBox="0 0 479.68 479.68" style="enable-background:new 0 0 479.68 479.68;" xml:space="preserve">
   <metadata id="metadata898">
      <rdf:RDF>
         <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
         </cc:Work>
      </rdf:RDF>
   </metadata>
   <defs id="defs896" />
   <g id="g891">
      <g id="g889">
         <path
            d="M342.128,426v-98V120v-8h-0.408C337.576,49.56,285.592,0,222.128,0h-208c-4.416,0-8,3.584-8,8    c0,36.28,16.248,68.784,41.776,90.808c-6.376,17.008-9.776,34.848-9.776,53.192v144c0,4.416,3.584,8,8,8h32v80    c0,4.416,3.584,8,8,8h112v34L66.712,464.32l4.48,15.36l134.168-39.12l61.2,30.6c1.112,0.56,2.344,0.84,3.568,0.84    s2.456-0.28,3.576-0.84l61.2-30.6l134.168,39.12l4.48-15.36L342.128,426z M22.432,16h199.696c5.456,0,10.768,0.552,16,1.36V112    h-112C71.472,112,26.528,69.624,22.432,16z M246.128,168c26.472,0,48,21.528,48,48c0,2.864-0.304,5.656-0.784,8.384    c-0.056,0.304-0.08,0.608-0.136,0.904c-0.488,2.48-1.208,4.872-2.056,7.2c-0.192,0.528-0.368,1.072-0.584,1.592    c-0.848,2.096-1.88,4.104-3.008,6.04c-0.392,0.672-0.784,1.336-1.208,1.984c-1.144,1.76-2.4,3.432-3.752,5.024    c-0.568,0.664-1.16,1.312-1.768,1.944c-1.424,1.496-2.92,2.912-4.528,4.208c-0.632,0.512-1.304,0.992-1.968,1.472    c-1.768,1.288-3.6,2.504-5.552,3.544c-0.512,0.272-1.048,0.496-1.568,0.76c-2.232,1.088-4.528,2.08-6.944,2.816    c-0.184,0.056-0.376,0.088-0.56,0.144c-2.728,0.792-5.544,1.392-8.456,1.704h-0.008c-1.688,0.176-3.392,0.28-5.12,0.28    c-26.472,0-48-21.528-48-48S219.656,168,246.128,168z M326.128,427.056l-56,28l-56-28V384c0-4.416-3.584-8-8-8h-112v-80    c0-4.416-3.584-8-8-8h-32V152c0-14.84,2.48-29.304,7.144-43.192C80,120.896,102.232,128,126.128,128h112v24.552    c-31.52,3.96-56,30.872-56,63.448s24.48,59.488,56,63.448V320h-73.472c-3.312-9.288-12.112-16-22.528-16h-8    c-13.232,0-24,10.768-24,24s10.768,24,24,24h8c10.416,0,19.216-6.712,22.528-16h81.472c4.416,0,8-3.584,8-8v-35.048    c16.056,24.464,42.328,40.28,72,42.704V427.056z M150.128,328c0,4.408-3.592,8-8,8h-8c-4.408,0-8-3.592-8-8c0-4.408,3.592-8,8-8h8    C146.536,320,150.128,323.592,150.128,328z M326.128,319.608c-26.72-2.624-50.016-18.312-62.552-42.016    c0.368-0.104,0.712-0.24,1.072-0.352c0.432-0.128,0.856-0.28,1.288-0.416c1.608-0.52,3.176-1.096,4.72-1.728    c0.216-0.088,0.432-0.176,0.648-0.272c17.12-7.288,30.208-21.72,35.808-39.456c0.104-0.32,0.192-0.648,0.288-0.976    c0.456-1.528,0.856-3.072,1.2-4.648c0.112-0.528,0.232-1.048,0.336-1.584c0.28-1.456,0.496-2.936,0.68-4.424    c0.064-0.552,0.152-1.096,0.208-1.656c0.184-2,0.304-4.024,0.304-6.08c0-2.128-0.112-4.224-0.32-6.296    c-0.072-0.696-0.2-1.376-0.288-2.064c-0.176-1.36-0.36-2.728-0.624-4.064c-0.16-0.8-0.376-1.584-0.56-2.376    c-0.28-1.192-0.568-2.384-0.912-3.552c-0.248-0.824-0.544-1.624-0.816-2.432c-0.376-1.096-0.76-2.192-1.192-3.256    c-0.336-0.816-0.696-1.608-1.064-2.408c-0.464-1.024-0.944-2.032-1.456-3.024c-0.408-0.792-0.848-1.56-1.288-2.328    c-0.552-0.96-1.12-1.896-1.72-2.824c-0.48-0.752-0.984-1.48-1.496-2.208c-0.632-0.896-1.288-1.768-1.968-2.624    c-0.552-0.696-1.104-1.392-1.68-2.064c-0.72-0.84-1.464-1.64-2.224-2.44c-0.6-0.632-1.2-1.272-1.824-1.88    c-0.808-0.784-1.648-1.528-2.496-2.264c-0.64-0.56-1.272-1.136-1.936-1.672c-0.912-0.736-1.864-1.416-2.816-2.104    c-0.656-0.472-1.288-0.968-1.96-1.416c-1.072-0.712-2.192-1.36-3.304-2.008c-0.6-0.352-1.176-0.728-1.792-1.064    c-1.68-0.904-3.408-1.744-5.176-2.496c-0.072-0.032-0.136-0.072-0.208-0.096c-1.84-0.784-3.736-1.464-5.656-2.072    c-0.616-0.192-1.256-0.328-1.88-0.504c-1.328-0.376-2.656-0.744-4.016-1.04c-0.768-0.16-1.552-0.264-2.32-0.4    c-1-0.176-1.984-0.392-3-0.52V120V21.088c41.72,13.536,71.992,52.736,71.992,98.912V319.608z"
            style="fill:currentColor;stroke: currentColor; stroke-width: 15px;" id="path887" />
      </g>
   </g>
</svg>`

	// DivIcon values setup
	__DivIcon__000006_Antena.Name = `Antena`
	__DivIcon__000006_Antena.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   id="Layer_1"
   x="0px"
   y="0px"
   width="512px"
   height="512px"
   viewBox="0 0 512 512"
   enable-background="new 0 0 512 512"
   xml:space="preserve"><metadata
   id="metadata3319"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs3317" />
<path
   d="M336,474.5v32H176v-32c0-17.688,14.313-32,32-32h32V231.563c-18.625-6.625-32-24.188-32-45.063c0-26.5,21.5-48,48-48  s48,21.5,48,48c0,20.875-13.438,38.438-32,45.063V442.5h32C321.688,442.5,336,456.813,336,474.5z M176.813,265.688L188.063,277  l22.688-22.625l-11.313-11.313c-31.188-31.188-31.188-81.938,0-113.125l11.313-11.313L188.125,96l-11.313,11.313  C133.125,150.938,133.125,222,176.813,265.688z M154.188,84.688L165.5,73.375L142.875,50.75l-11.313,11.313  c-68.625,68.625-68.625,180.25,0,248.875l11.313,11.313l22.625-22.625l-11.313-11.313C98,232.188,98,140.813,154.188,84.688z   M108.938,39.438l11.313-11.313L97.625,5.5L86.313,16.813c-93.563,93.563-93.563,245.813,0,339.438l11.313,11.313l22.625-22.625  l-11.313-11.313C27.813,252.5,27.813,120.5,108.938,39.438z M312.563,243.063l-11.313,11.313L323.938,277l11.25-11.313  c43.688-43.688,43.688-114.75,0-158.375L323.875,96l-22.625,22.625l11.313,11.313C343.75,161.125,343.75,211.875,312.563,243.063z   M380.438,62.063L369.125,50.75L346.5,73.375l11.313,11.313c56.125,56.125,56.125,147.5,0,203.625L346.5,299.625l22.625,22.625  l11.313-11.313C449.063,242.313,449.063,130.688,380.438,62.063z M425.688,16.813L414.375,5.5L391.75,28.125l11.313,11.313  c81.063,81.063,81.063,213,0,294.188l-11.313,11.313l22.625,22.625l11.313-11.313C519.25,262.625,519.25,110.313,425.688,16.813z"
   style="fill:currentColor;"
   id="path3312" />
</svg>
`

	// DivIcon values setup
	__DivIcon__000007_Antena.Name = `Antena`
	__DivIcon__000007_Antena.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   id="Layer_1"
   x="0px"
   y="0px"
   width="512px"
   height="512px"
   viewBox="0 0 512 512"
   enable-background="new 0 0 512 512"
   xml:space="preserve"><metadata
   id="metadata3319"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs3317" />
<path
   d="M336,474.5v32H176v-32c0-17.688,14.313-32,32-32h32V231.563c-18.625-6.625-32-24.188-32-45.063c0-26.5,21.5-48,48-48  s48,21.5,48,48c0,20.875-13.438,38.438-32,45.063V442.5h32C321.688,442.5,336,456.813,336,474.5z M176.813,265.688L188.063,277  l22.688-22.625l-11.313-11.313c-31.188-31.188-31.188-81.938,0-113.125l11.313-11.313L188.125,96l-11.313,11.313  C133.125,150.938,133.125,222,176.813,265.688z M154.188,84.688L165.5,73.375L142.875,50.75l-11.313,11.313  c-68.625,68.625-68.625,180.25,0,248.875l11.313,11.313l22.625-22.625l-11.313-11.313C98,232.188,98,140.813,154.188,84.688z   M108.938,39.438l11.313-11.313L97.625,5.5L86.313,16.813c-93.563,93.563-93.563,245.813,0,339.438l11.313,11.313l22.625-22.625  l-11.313-11.313C27.813,252.5,27.813,120.5,108.938,39.438z M312.563,243.063l-11.313,11.313L323.938,277l11.25-11.313  c43.688-43.688,43.688-114.75,0-158.375L323.875,96l-22.625,22.625l11.313,11.313C343.75,161.125,343.75,211.875,312.563,243.063z   M380.438,62.063L369.125,50.75L346.5,73.375l11.313,11.313c56.125,56.125,56.125,147.5,0,203.625L346.5,299.625l22.625,22.625  l11.313-11.313C449.063,242.313,449.063,130.688,380.438,62.063z M425.688,16.813L414.375,5.5L391.75,28.125l11.313,11.313  c81.063,81.063,81.063,213,0,294.188l-11.313,11.313l22.625,22.625l11.313-11.313C519.25,262.625,519.25,110.313,425.688,16.813z"
   style="fill:currentColor;"
   id="path3312" />
</svg>
`

	// DivIcon values setup
	__DivIcon__000008_Arrow.Name = `Arrow`
	__DivIcon__000008_Arrow.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg" width="536.46515" height="442.16479" viewBox="0 0 536.46515 442.16479"
   version="1.1" id="svg837">
   <metadata id="metadata843">
      <rdf:RDF>
         <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
         </cc:Work>
      </rdf:RDF>
   </metadata>
   <defs id="defs841" />
   <path d="m 12.816999,32.812731 24,-24.0000002 L 544.50239,477.93633 Z" fill="none" id="path833" />
   <path
      d="M 223.26691,139.0201 V 376.18283 H 293.0636 V 139.0201 H 397.75865 L 258.16525,60.22916 118.57186,139.0201 Z"
      id="path835"
      style="opacity:0.508039;fill:none;fill-opacity:1;stroke:#848988;stroke-width:22.0384;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
</svg>`

	// DivIcon values setup
	__DivIcon__000009_Arrow.Name = `Arrow`
	__DivIcon__000009_Arrow.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg" width="536.46515" height="442.16479" viewBox="0 0 536.46515 442.16479"
   version="1.1" id="svg837">
   <metadata id="metadata843">
      <rdf:RDF>
         <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
         </cc:Work>
      </rdf:RDF>
   </metadata>
   <defs id="defs841" />
   <path d="m 12.816999,32.812731 24,-24.0000002 L 544.50239,477.93633 Z" fill="none" id="path833" />
   <path
      d="M 223.26691,139.0201 V 376.18283 H 293.0636 V 139.0201 H 397.75865 L 258.16525,60.22916 118.57186,139.0201 Z"
      id="path835"
      style="opacity:0.508039;fill:none;fill-opacity:1;stroke:#848988;stroke-width:22.0384;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
</svg>`

	// DivIcon values setup
	__DivIcon__000010_Cross.Name = `Cross`
	__DivIcon__000010_Cross.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 247.8159 245.96277" version="1.1" id="svg837" width="247.8159"
   height="245.96277">
   <metadata id="metadata843">
      <rdf:RDF>
         <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
         </cc:Work>
      </rdf:RDF>
   </metadata>
   <defs id="defs841" />
   <path
      d="M 13.016941,234.97312 C 27.630151,220.53327 225.23808,21.927687 236.85954,11.138987 225.9202,20.941477 26.045681,220.80369 13.016941,234.97312 Z"
      id="path835"
      style="opacity:0.508039;fill:none;fill-opacity:1;stroke:currentColor;stroke-width:22.0384;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
   <path
      d="M 10.989647,10.99073 C 25.429497,25.60395 224.03507,223.21187 234.82376,234.83333 225.02128,223.89399 25.159067,24.01948 10.989647,10.99073 Z"
      id="path835-6"
      style="opacity:0.508039;fill:none;fill-opacity:1;stroke:currentColor;stroke-width:22.0384;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
</svg>`

	// DivIcon values setup
	__DivIcon__000011_Cross.Name = `Cross`
	__DivIcon__000011_Cross.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 247.8159 245.96277" version="1.1" id="svg837" width="247.8159"
   height="245.96277">
   <metadata id="metadata843">
      <rdf:RDF>
         <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
         </cc:Work>
      </rdf:RDF>
   </metadata>
   <defs id="defs841" />
   <path
      d="M 13.016941,234.97312 C 27.630151,220.53327 225.23808,21.927687 236.85954,11.138987 225.9202,20.941477 26.045681,220.80369 13.016941,234.97312 Z"
      id="path835"
      style="opacity:0.508039;fill:none;fill-opacity:1;stroke:currentColor;stroke-width:22.0384;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
   <path
      d="M 10.989647,10.99073 C 25.429497,25.60395 224.03507,223.21187 234.82376,234.83333 225.02128,223.89399 25.159067,24.01948 10.989647,10.99073 Z"
      id="path835-6"
      style="opacity:0.508039;fill:none;fill-opacity:1;stroke:currentColor;stroke-width:22.0384;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
</svg>`

	// DivIcon values setup
	__DivIcon__000012_Dot10.Name = `Dot10`
	__DivIcon__000012_Dot10.SVG = `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"
	version="1.1" width="20" height="20" x="0" y="0" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20"
	xml:space="preserve" class="">
	<g>
		<g xmlns="http://www.w3.org/2000/svg">
			<g>
				<g>
					<circle cx="10" cy="15" r="3" fill="currentColor" opacity="0.2" />
				</g>
			</g>
		</g>
		<g xmlns="http://www.w3.org/2000/svg">
		</g>
	</g>
</svg>`

	// DivIcon values setup
	__DivIcon__000013_Dot10.Name = `Dot10`
	__DivIcon__000013_Dot10.SVG = `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"
	version="1.1" width="20" height="20" x="0" y="0" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20"
	xml:space="preserve" class="">
	<g>
		<g xmlns="http://www.w3.org/2000/svg">
			<g>
				<g>
					<circle cx="10" cy="15" r="3" fill="currentColor" opacity="0.2" />
				</g>
			</g>
		</g>
		<g xmlns="http://www.w3.org/2000/svg">
		</g>
	</g>
</svg>`

	// DivIcon values setup
	__DivIcon__000014_DotBlur.Name = `DotBlur`
	__DivIcon__000014_DotBlur.SVG = `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 405.333 405.333" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g>
<g xmlns="http://www.w3.org/2000/svg">
	<g>
		<g>
			<path d="M10.667,234.667C4.8,234.667,0,239.467,0,245.333C0,251.2,4.8,256,10.667,256c5.867,0,10.667-4.8,10.667-10.667     C21.333,239.467,16.533,234.667,10.667,234.667z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M10.667,149.333C4.8,149.333,0,154.133,0,160c0,5.867,4.8,10.667,10.667,10.667c5.867,0,10.667-4.8,10.667-10.667     C21.333,154.133,16.533,149.333,10.667,149.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,384c-5.867,0-10.667,4.8-10.667,10.667c0,5.867,4.8,10.667,10.667,10.667c5.867,0,10.667-4.8,10.667-10.667     C170.667,388.8,165.867,384,160,384z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M74.667,53.333c-11.733,0-21.333,9.6-21.333,21.333S62.933,96,74.667,96S96,86.4,96,74.667S86.4,53.333,74.667,53.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M74.667,138.667c-11.733,0-21.333,9.6-21.333,21.333s9.6,21.333,21.333,21.333S96,171.733,96,160     S86.4,138.667,74.667,138.667z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M74.667,224c-11.733,0-21.333,9.6-21.333,21.333c0,11.733,9.6,21.333,21.333,21.333S96,257.067,96,245.333     C96,233.6,86.4,224,74.667,224z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M394.667,170.667c5.867,0,10.667-4.8,10.667-10.667c0-5.867-4.8-10.667-10.667-10.667c-5.867,0-10.667,4.8-10.667,10.667     C384,165.867,388.8,170.667,394.667,170.667z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,21.333c5.867,0,10.667-4.8,10.667-10.667C256,4.8,251.2,0,245.333,0c-5.867,0-10.667,4.8-10.667,10.667     C234.667,16.533,239.467,21.333,245.333,21.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,96c11.733,0,21.333-9.6,21.333-21.333s-9.6-21.333-21.333-21.333s-21.333,9.6-21.333,21.333S148.267,96,160,96z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,21.333c5.867,0,10.667-4.8,10.667-10.667C170.667,4.8,165.867,0,160,0c-5.867,0-10.667,4.8-10.667,10.667     C149.333,16.533,154.133,21.333,160,21.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,96c11.733,0,21.333-9.6,21.333-21.333s-9.6-21.333-21.333-21.333c-11.733,0-21.333,9.6-21.333,21.333     S233.6,96,245.333,96z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M74.667,309.333c-11.733,0-21.333,9.6-21.333,21.333c0,11.733,9.6,21.333,21.333,21.333S96,342.4,96,330.667     C96,318.933,86.4,309.333,74.667,309.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,128c-17.707,0-32,14.293-32,32s14.293,32,32,32s32-14.293,32-32S263.04,128,245.333,128z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M330.667,224c-11.733,0-21.333,9.6-21.333,21.333c0,11.733,9.6,21.333,21.333,21.333c11.733,0,21.333-9.6,21.333-21.333     C352,233.6,342.4,224,330.667,224z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M330.667,309.333c-11.733,0-21.333,9.6-21.333,21.333c0,11.733,9.6,21.333,21.333,21.333     C342.4,352,352,342.4,352,330.667C352,318.933,342.4,309.333,330.667,309.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M330.667,138.667c-11.733,0-21.333,9.6-21.333,21.333s9.6,21.333,21.333,21.333c11.733,0,21.333-9.6,21.333-21.333     S342.4,138.667,330.667,138.667z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M394.667,234.667c-5.867,0-10.667,4.8-10.667,10.667C384,251.2,388.8,256,394.667,256c5.867,0,10.667-4.8,10.667-10.667     C405.333,239.467,400.533,234.667,394.667,234.667z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M330.667,53.333c-11.733,0-21.333,9.6-21.333,21.333S318.933,96,330.667,96C342.4,96,352,86.4,352,74.667     S342.4,53.333,330.667,53.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,213.333c-17.707,0-32,14.293-32,32s14.293,32,32,32s32-14.293,32-32S177.707,213.333,160,213.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,309.333c-11.733,0-21.333,9.6-21.333,21.333c0,11.733,9.6,21.333,21.333,21.333s21.333-9.6,21.333-21.333     C181.333,318.933,171.733,309.333,160,309.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,128c-17.707,0-32,14.293-32,32s14.293,32,32,32s32-14.293,32-32S177.707,128,160,128z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,309.333c-11.733,0-21.333,9.6-21.333,21.333C224,342.4,233.6,352,245.333,352     c11.733,0,21.333-9.6,21.333-21.333C266.667,318.933,257.067,309.333,245.333,309.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,384c-5.867,0-10.667,4.8-10.667,10.667c0,5.867,4.8,10.667,10.667,10.667c5.867,0,10.667-4.8,10.667-10.667     C256,388.8,251.2,384,245.333,384z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,213.333c-17.707,0-32,14.293-32,32s14.293,32,32,32s32-14.293,32-32S263.04,213.333,245.333,213.333z" fill="currentColor" data-original="#000000" style="" class=""/>
		</g>
	</g>
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
</g></svg>
`

	// DivIcon values setup
	__DivIcon__000015_DotBlur.Name = `DotBlur`
	__DivIcon__000015_DotBlur.SVG = `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 405.333 405.333" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g>
<g xmlns="http://www.w3.org/2000/svg">
	<g>
		<g>
			<path d="M10.667,234.667C4.8,234.667,0,239.467,0,245.333C0,251.2,4.8,256,10.667,256c5.867,0,10.667-4.8,10.667-10.667     C21.333,239.467,16.533,234.667,10.667,234.667z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M10.667,149.333C4.8,149.333,0,154.133,0,160c0,5.867,4.8,10.667,10.667,10.667c5.867,0,10.667-4.8,10.667-10.667     C21.333,154.133,16.533,149.333,10.667,149.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,384c-5.867,0-10.667,4.8-10.667,10.667c0,5.867,4.8,10.667,10.667,10.667c5.867,0,10.667-4.8,10.667-10.667     C170.667,388.8,165.867,384,160,384z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M74.667,53.333c-11.733,0-21.333,9.6-21.333,21.333S62.933,96,74.667,96S96,86.4,96,74.667S86.4,53.333,74.667,53.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M74.667,138.667c-11.733,0-21.333,9.6-21.333,21.333s9.6,21.333,21.333,21.333S96,171.733,96,160     S86.4,138.667,74.667,138.667z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M74.667,224c-11.733,0-21.333,9.6-21.333,21.333c0,11.733,9.6,21.333,21.333,21.333S96,257.067,96,245.333     C96,233.6,86.4,224,74.667,224z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M394.667,170.667c5.867,0,10.667-4.8,10.667-10.667c0-5.867-4.8-10.667-10.667-10.667c-5.867,0-10.667,4.8-10.667,10.667     C384,165.867,388.8,170.667,394.667,170.667z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,21.333c5.867,0,10.667-4.8,10.667-10.667C256,4.8,251.2,0,245.333,0c-5.867,0-10.667,4.8-10.667,10.667     C234.667,16.533,239.467,21.333,245.333,21.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,96c11.733,0,21.333-9.6,21.333-21.333s-9.6-21.333-21.333-21.333s-21.333,9.6-21.333,21.333S148.267,96,160,96z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,21.333c5.867,0,10.667-4.8,10.667-10.667C170.667,4.8,165.867,0,160,0c-5.867,0-10.667,4.8-10.667,10.667     C149.333,16.533,154.133,21.333,160,21.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,96c11.733,0,21.333-9.6,21.333-21.333s-9.6-21.333-21.333-21.333c-11.733,0-21.333,9.6-21.333,21.333     S233.6,96,245.333,96z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M74.667,309.333c-11.733,0-21.333,9.6-21.333,21.333c0,11.733,9.6,21.333,21.333,21.333S96,342.4,96,330.667     C96,318.933,86.4,309.333,74.667,309.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,128c-17.707,0-32,14.293-32,32s14.293,32,32,32s32-14.293,32-32S263.04,128,245.333,128z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M330.667,224c-11.733,0-21.333,9.6-21.333,21.333c0,11.733,9.6,21.333,21.333,21.333c11.733,0,21.333-9.6,21.333-21.333     C352,233.6,342.4,224,330.667,224z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M330.667,309.333c-11.733,0-21.333,9.6-21.333,21.333c0,11.733,9.6,21.333,21.333,21.333     C342.4,352,352,342.4,352,330.667C352,318.933,342.4,309.333,330.667,309.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M330.667,138.667c-11.733,0-21.333,9.6-21.333,21.333s9.6,21.333,21.333,21.333c11.733,0,21.333-9.6,21.333-21.333     S342.4,138.667,330.667,138.667z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M394.667,234.667c-5.867,0-10.667,4.8-10.667,10.667C384,251.2,388.8,256,394.667,256c5.867,0,10.667-4.8,10.667-10.667     C405.333,239.467,400.533,234.667,394.667,234.667z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M330.667,53.333c-11.733,0-21.333,9.6-21.333,21.333S318.933,96,330.667,96C342.4,96,352,86.4,352,74.667     S342.4,53.333,330.667,53.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,213.333c-17.707,0-32,14.293-32,32s14.293,32,32,32s32-14.293,32-32S177.707,213.333,160,213.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,309.333c-11.733,0-21.333,9.6-21.333,21.333c0,11.733,9.6,21.333,21.333,21.333s21.333-9.6,21.333-21.333     C181.333,318.933,171.733,309.333,160,309.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M160,128c-17.707,0-32,14.293-32,32s14.293,32,32,32s32-14.293,32-32S177.707,128,160,128z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,309.333c-11.733,0-21.333,9.6-21.333,21.333C224,342.4,233.6,352,245.333,352     c11.733,0,21.333-9.6,21.333-21.333C266.667,318.933,257.067,309.333,245.333,309.333z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,384c-5.867,0-10.667,4.8-10.667,10.667c0,5.867,4.8,10.667,10.667,10.667c5.867,0,10.667-4.8,10.667-10.667     C256,388.8,251.2,384,245.333,384z" fill="currentColor" data-original="#000000" style="" class=""/>
			<path d="M245.333,213.333c-17.707,0-32,14.293-32,32s14.293,32,32,32s32-14.293,32-32S263.04,213.333,245.333,213.333z" fill="currentColor" data-original="#000000" style="" class=""/>
		</g>
	</g>
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
<g xmlns="http://www.w3.org/2000/svg">
</g>
</g></svg>
`

	// DivIcon values setup
	__DivIcon__000016_Message.Name = `Message`
	__DivIcon__000016_Message.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   width="512"
   height="512"
   x="0"
   y="0"
   viewBox="0 0 512 512"
   style="enable-background:new 0 0 512 512"
   xml:space="preserve"
   class=""
   id="svg5339"><metadata
     id="metadata5345"><rdf:RDF><cc:Work
         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
     id="defs5343" /><g
     id="g5337">
<g
   id="g5287">
	<g
   id="g5285">
		<path
   d="M467,61H45c-6.927,0-13.412,1.703-19.279,4.51L255,294.789l51.389-49.387c0,0,0.004-0.005,0.005-0.007    c0.001-0.002,0.005-0.004,0.005-0.004L486.286,65.514C480.418,62.705,473.929,61,467,61z"
   fill="currentColor"
   data-original="#000000"
   style=""
   class=""
   id="path5283" />
	</g>
</g>
<g
   id="g5293">
	<g
   id="g5291">
		<path
   d="M507.496,86.728L338.213,256.002L507.49,425.279c2.807-5.867,4.51-12.352,4.51-19.279V106    C512,99.077,510.301,92.593,507.496,86.728z"
   fill="currentColor"
   data-original="#000000"
   style=""
   class=""
   id="path5289" />
	</g>
</g>
<g
   id="g5299">
	<g
   id="g5297">
		<path
   d="M4.51,86.721C1.703,92.588,0,99.073,0,106v300c0,6.923,1.701,13.409,4.506,19.274L173.789,256L4.51,86.721z"
   fill="currentColor"
   data-original="#000000"
   style=""
   class=""
   id="path5295" />
	</g>
</g>
<g
   id="g5305">
	<g
   id="g5303">
		<path
   d="M317.002,277.213l-51.396,49.393c-2.93,2.93-6.768,4.395-10.605,4.395s-7.676-1.465-10.605-4.395L195,277.211    L25.714,446.486C31.582,449.295,38.071,451,45,451h422c6.927,0,13.412-1.703,19.279-4.51L317.002,277.213z"
   fill="currentColor"
   data-original="#000000"
   style=""
   class=""
   id="path5301" />
	</g>
</g>
<g
   id="g5307">
</g>
<g
   id="g5309">
</g>
<g
   id="g5311">
</g>
<g
   id="g5313">
</g>
<g
   id="g5315">
</g>
<g
   id="g5317">
</g>
<g
   id="g5319">
</g>
<g
   id="g5321">
</g>
<g
   id="g5323">
</g>
<g
   id="g5325">
</g>
<g
   id="g5327">
</g>
<g
   id="g5329">
</g>
<g
   id="g5331">
</g>
<g
   id="g5333">
</g>
<g
   id="g5335">
</g>
</g></svg>
`

	// DivIcon values setup
	__DivIcon__000017_Message.Name = `Message`
	__DivIcon__000017_Message.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   width="512"
   height="512"
   x="0"
   y="0"
   viewBox="0 0 512 512"
   style="enable-background:new 0 0 512 512"
   xml:space="preserve"
   class=""
   id="svg5339"><metadata
     id="metadata5345"><rdf:RDF><cc:Work
         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
     id="defs5343" /><g
     id="g5337">
<g
   id="g5287">
	<g
   id="g5285">
		<path
   d="M467,61H45c-6.927,0-13.412,1.703-19.279,4.51L255,294.789l51.389-49.387c0,0,0.004-0.005,0.005-0.007    c0.001-0.002,0.005-0.004,0.005-0.004L486.286,65.514C480.418,62.705,473.929,61,467,61z"
   fill="currentColor"
   data-original="#000000"
   style=""
   class=""
   id="path5283" />
	</g>
</g>
<g
   id="g5293">
	<g
   id="g5291">
		<path
   d="M507.496,86.728L338.213,256.002L507.49,425.279c2.807-5.867,4.51-12.352,4.51-19.279V106    C512,99.077,510.301,92.593,507.496,86.728z"
   fill="currentColor"
   data-original="#000000"
   style=""
   class=""
   id="path5289" />
	</g>
</g>
<g
   id="g5299">
	<g
   id="g5297">
		<path
   d="M4.51,86.721C1.703,92.588,0,99.073,0,106v300c0,6.923,1.701,13.409,4.506,19.274L173.789,256L4.51,86.721z"
   fill="currentColor"
   data-original="#000000"
   style=""
   class=""
   id="path5295" />
	</g>
</g>
<g
   id="g5305">
	<g
   id="g5303">
		<path
   d="M317.002,277.213l-51.396,49.393c-2.93,2.93-6.768,4.395-10.605,4.395s-7.676-1.465-10.605-4.395L195,277.211    L25.714,446.486C31.582,449.295,38.071,451,45,451h422c6.927,0,13.412-1.703,19.279-4.51L317.002,277.213z"
   fill="currentColor"
   data-original="#000000"
   style=""
   class=""
   id="path5301" />
	</g>
</g>
<g
   id="g5307">
</g>
<g
   id="g5309">
</g>
<g
   id="g5311">
</g>
<g
   id="g5313">
</g>
<g
   id="g5315">
</g>
<g
   id="g5317">
</g>
<g
   id="g5319">
</g>
<g
   id="g5321">
</g>
<g
   id="g5323">
</g>
<g
   id="g5325">
</g>
<g
   id="g5327">
</g>
<g
   id="g5329">
</g>
<g
   id="g5331">
</g>
<g
   id="g5333">
</g>
<g
   id="g5335">
</g>
</g></svg>
`

	// DivIcon values setup
	__DivIcon__000018_Radar.Name = `Radar`
	__DivIcon__000018_Radar.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   id="Layer_1"
   x="0px"
   y="0px"
   viewBox="0 0 512 512"
   style="enable-background:new 0 0 512 512;"
   xml:space="preserve"><metadata
   id="metadata6031"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs6029" />
<g
   id="g5994">
	<g
   id="g5992">
		<path
   d="M316.488,417.365h-0.893l-22.432-93.553c79.093-17.1,138.538-87.203,138.538-171.336c0-10.051-8.148-17.804-18.199-17.804    h-52.948c-0.749-2.427-1.912-4.479-3.517-6.308l-82.837-94.591V18.199C274.199,8.148,266.051,0,256,0s-18.199,8.148-18.199,18.199    v15.575l-82.837,94.591c-1.605,1.828-2.769,3.881-3.517,6.308H98.498c-10.051,0-18.199,7.897-18.199,17.948    c0,84.133,59.445,154.215,138.537,171.315l-22.432,93.429h-0.893c-35.556,0-64.478,29.509-64.478,65.065v10.779    c0,10.051,8.142,18.791,18.193,18.791h213.548c10.051,0,18.193-8.74,18.193-18.791V482.43    C380.967,446.874,352.045,417.365,316.488,417.365z M274.199,88.939l39.718,45.734h-39.718V88.939z M237.801,88.939v45.734    h-39.718L237.801,88.939z M117.88,171.071h276.24c-8.941,67.943-67.472,121.103-138.12,121.103S126.821,239.014,117.88,171.071z     M278.172,417.365h-44.345l21.486-89.594c0.229,0.001,0.457,0.154,0.687,0.154s0.457-0.226,0.687-0.227L278.172,417.365z     M168.42,475.602c3.262-12.133,14.172-21.839,27.092-21.839h120.976c12.919,0,23.83,9.706,27.091,21.839H168.42z"
   style="fill:currentColor;stroke:none"
   id="path5990" />
			 
	</g>
</g>
<g
   id="g5996">
</g>
<g
   id="g5998">
</g>
<g
   id="g6000">
</g>
<g
   id="g6002">
</g>
<g
   id="g6004">
</g>
<g
   id="g6006">
</g>
<g
   id="g6008">
</g>
<g
   id="g6010">
</g>
<g
   id="g6012">
</g>
<g
   id="g6014">
</g>
<g
   id="g6016">
</g>
<g
   id="g6018">
</g>
<g
   id="g6020">
</g>
<g
   id="g6022">
</g>
<g
   id="g6024">
</g>
</svg>
`

	// DivIcon values setup
	__DivIcon__000019_Radar.Name = `Radar`
	__DivIcon__000019_Radar.SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   id="Layer_1"
   x="0px"
   y="0px"
   viewBox="0 0 512 512"
   style="enable-background:new 0 0 512 512;"
   xml:space="preserve"><metadata
   id="metadata6031"><rdf:RDF><cc:Work
       rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
   id="defs6029" />
<g
   id="g5994">
	<g
   id="g5992">
		<path
   d="M316.488,417.365h-0.893l-22.432-93.553c79.093-17.1,138.538-87.203,138.538-171.336c0-10.051-8.148-17.804-18.199-17.804    h-52.948c-0.749-2.427-1.912-4.479-3.517-6.308l-82.837-94.591V18.199C274.199,8.148,266.051,0,256,0s-18.199,8.148-18.199,18.199    v15.575l-82.837,94.591c-1.605,1.828-2.769,3.881-3.517,6.308H98.498c-10.051,0-18.199,7.897-18.199,17.948    c0,84.133,59.445,154.215,138.537,171.315l-22.432,93.429h-0.893c-35.556,0-64.478,29.509-64.478,65.065v10.779    c0,10.051,8.142,18.791,18.193,18.791h213.548c10.051,0,18.193-8.74,18.193-18.791V482.43    C380.967,446.874,352.045,417.365,316.488,417.365z M274.199,88.939l39.718,45.734h-39.718V88.939z M237.801,88.939v45.734    h-39.718L237.801,88.939z M117.88,171.071h276.24c-8.941,67.943-67.472,121.103-138.12,121.103S126.821,239.014,117.88,171.071z     M278.172,417.365h-44.345l21.486-89.594c0.229,0.001,0.457,0.154,0.687,0.154s0.457-0.226,0.687-0.227L278.172,417.365z     M168.42,475.602c3.262-12.133,14.172-21.839,27.092-21.839h120.976c12.919,0,23.83,9.706,27.091,21.839H168.42z"
   style="fill:currentColor;stroke:none"
   id="path5990" />
			 
	</g>
</g>
<g
   id="g5996">
</g>
<g
   id="g5998">
</g>
<g
   id="g6000">
</g>
<g
   id="g6002">
</g>
<g
   id="g6004">
</g>
<g
   id="g6006">
</g>
<g
   id="g6008">
</g>
<g
   id="g6010">
</g>
<g
   id="g6012">
</g>
<g
   id="g6014">
</g>
<g
   id="g6016">
</g>
<g
   id="g6018">
</g>
<g
   id="g6020">
</g>
<g
   id="g6022">
</g>
<g
   id="g6024">
</g>
</svg>
`

	// DivIcon values setup
	__DivIcon__000020_Satellite.Name = `Satellite`
	__DivIcon__000020_Satellite.SVG = `<svg xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 410 410" >

<g transform="scale(1 1) translate(0 0)">

    <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="16">
    <path d="m 267.12 218.02 l 130.15 130.15 l -47.34 47.34 l -130.15 -130.15 z"/>
    <path d="m 244.64 231.03 l -14.2 14.2"/>
    <path d="m 178.37 164.77 l -14.2 14.2"/>

    <path d="m 145.24 240.49 l -17.749 41.41 l 41.41 -17.749"/>
    <path d="m 197.7 290.05 c -8.169 8.169 -32.01 -2.426 -53.25 -23.666 -21.241 -21.241 -31.834 -45.08 -23.666 -53.25 8.169 -8.169 32.01 2.426 53.25 23.666 21.241 21.241 31.834 45.08 23.666 53.25 z"/>
    <path d="m 209.14 143.46 l 10.738 10.56 l 5.829 -5.829 l 35.498 35.498 l -5.917 5.917 l 11.832 11.832 l -63.07 62.21 l -58.13 -58.13 z"/>


    <path d="m 61.23 12.12 l 130.15 130.15 l -47.34 47.34 l -130.15 -130.15 z"/>

    </g>


    <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="16">

        <path d="m 12.721 285.46 c 9.814 66.54 50.27 100.88 112.41 112.41"/>
        <path d="m 60.05 285.46 c 5.472 38.03 25 59.948 65.08 65.08"/>
        <path d="m 95.55 285.46 c 5.632 20.687 16.601 27.37 29.581 29.581"/>
    </g>



</g>
</svg>`

	// DivIcon values setup
	__DivIcon__000021_Satellite.Name = `Satellite`
	__DivIcon__000021_Satellite.SVG = `<svg xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 410 410" >

<g transform="scale(1 1) translate(0 0)">

    <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="16">
    <path d="m 267.12 218.02 l 130.15 130.15 l -47.34 47.34 l -130.15 -130.15 z"/>
    <path d="m 244.64 231.03 l -14.2 14.2"/>
    <path d="m 178.37 164.77 l -14.2 14.2"/>

    <path d="m 145.24 240.49 l -17.749 41.41 l 41.41 -17.749"/>
    <path d="m 197.7 290.05 c -8.169 8.169 -32.01 -2.426 -53.25 -23.666 -21.241 -21.241 -31.834 -45.08 -23.666 -53.25 8.169 -8.169 32.01 2.426 53.25 23.666 21.241 21.241 31.834 45.08 23.666 53.25 z"/>
    <path d="m 209.14 143.46 l 10.738 10.56 l 5.829 -5.829 l 35.498 35.498 l -5.917 5.917 l 11.832 11.832 l -63.07 62.21 l -58.13 -58.13 z"/>


    <path d="m 61.23 12.12 l 130.15 130.15 l -47.34 47.34 l -130.15 -130.15 z"/>

    </g>


    <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="16">

        <path d="m 12.721 285.46 c 9.814 66.54 50.27 100.88 112.41 112.41"/>
        <path d="m 60.05 285.46 c 5.472 38.03 25 59.948 65.08 65.08"/>
        <path d="m 95.55 285.46 c 5.632 20.687 16.601 27.37 29.581 29.581"/>
    </g>



</g>
</svg>`

	// LayerGroup values setup
	__LayerGroup__000000_Airport_Layer.Name = `Airport Layer`
	__LayerGroup__000000_Airport_Layer.DisplayName = `Airport Layer`

	// LayerGroup values setup
	__LayerGroup__000001_Airport_Layer.Name = `Airport Layer`
	__LayerGroup__000001_Airport_Layer.DisplayName = `Airport Layer`

	// LayerGroup values setup
	__LayerGroup__000002_Default.Name = `Default`
	__LayerGroup__000002_Default.DisplayName = ``

	// LayerGroup values setup
	__LayerGroup__000003_Default.Name = `Default`
	__LayerGroup__000003_Default.DisplayName = ``

	// LayerGroup values setup
	__LayerGroup__000004_Radar_Layer.Name = `Radar Layer`
	__LayerGroup__000004_Radar_Layer.DisplayName = `Radar Layer`

	// LayerGroup values setup
	__LayerGroup__000005_Radar_Layer.Name = `Radar Layer`
	__LayerGroup__000005_Radar_Layer.DisplayName = `Radar Layer`

	// LayerGroup values setup
	__LayerGroup__000006_Tracks_Layer.Name = `Tracks Layer`
	__LayerGroup__000006_Tracks_Layer.DisplayName = `Tracks Layer`

	// LayerGroup values setup
	__LayerGroup__000007_Tracks_Layer.Name = `Tracks Layer`
	__LayerGroup__000007_Tracks_Layer.DisplayName = `Tracks Layer`

	// LayerGroupUse values setup
	__LayerGroupUse__000000_Map1AirportLayerUse.Name = `Map1AirportLayerUse`
	__LayerGroupUse__000000_Map1AirportLayerUse.IsDisplayed = true

	// LayerGroupUse values setup
	__LayerGroupUse__000001_Map1AirportLayerUse.Name = `Map1AirportLayerUse`
	__LayerGroupUse__000001_Map1AirportLayerUse.IsDisplayed = true

	// LayerGroupUse values setup
	__LayerGroupUse__000002_Map1RadarLayerUse.Name = `Map1RadarLayerUse`
	__LayerGroupUse__000002_Map1RadarLayerUse.IsDisplayed = true

	// LayerGroupUse values setup
	__LayerGroupUse__000003_Map1RadarLayerUse.Name = `Map1RadarLayerUse`
	__LayerGroupUse__000003_Map1RadarLayerUse.IsDisplayed = true

	// LayerGroupUse values setup
	__LayerGroupUse__000004_Map1TracksLayerUse.Name = `Map1TracksLayerUse`
	__LayerGroupUse__000004_Map1TracksLayerUse.IsDisplayed = true

	// LayerGroupUse values setup
	__LayerGroupUse__000005_Map1TracksLayerUse.Name = `Map1TracksLayerUse`
	__LayerGroupUse__000005_Map1TracksLayerUse.IsDisplayed = true

	// LayerGroupUse values setup
	__LayerGroupUse__000006_Map2RadarLayerUse.Name = `Map2RadarLayerUse`
	__LayerGroupUse__000006_Map2RadarLayerUse.IsDisplayed = false

	// LayerGroupUse values setup
	__LayerGroupUse__000007_Map2RadarLayerUse.Name = `Map2RadarLayerUse`
	__LayerGroupUse__000007_Map2RadarLayerUse.IsDisplayed = false

	// LayerGroupUse values setup
	__LayerGroupUse__000008_Map2RadarLayerUse.Name = `Map2RadarLayerUse`
	__LayerGroupUse__000008_Map2RadarLayerUse.IsDisplayed = false

	// LayerGroupUse values setup
	__LayerGroupUse__000009_Map2RadarLayerUse.Name = `Map2RadarLayerUse`
	__LayerGroupUse__000009_Map2RadarLayerUse.IsDisplayed = false

	// LayerGroupUse values setup
	__LayerGroupUse__000010_Map2TracksLayerUse.Name = `Map2TracksLayerUse`
	__LayerGroupUse__000010_Map2TracksLayerUse.IsDisplayed = false

	// LayerGroupUse values setup
	__LayerGroupUse__000011_Map2TracksLayerUse.Name = `Map2TracksLayerUse`
	__LayerGroupUse__000011_Map2TracksLayerUse.IsDisplayed = false

	// MapOptions values setup
	__MapOptions__000000_Map1.Lat = 45.000000
	__MapOptions__000000_Map1.Lng = 5.000000
	__MapOptions__000000_Map1.Name = `Map1`
	__MapOptions__000000_Map1.ZoomLevel = 7.000000
	__MapOptions__000000_Map1.UrlTemplate = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`
	__MapOptions__000000_Map1.Attribution = `osm`
	__MapOptions__000000_Map1.MaxZoom = 18
	__MapOptions__000000_Map1.ZoomControl = false
	__MapOptions__000000_Map1.AttributionControl = false
	__MapOptions__000000_Map1.ZoomSnap = 1

	// MapOptions values setup
	__MapOptions__000001_Map1.Lat = 45.000000
	__MapOptions__000001_Map1.Lng = 5.000000
	__MapOptions__000001_Map1.Name = `Map1`
	__MapOptions__000001_Map1.ZoomLevel = 7.000000
	__MapOptions__000001_Map1.UrlTemplate = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`
	__MapOptions__000001_Map1.Attribution = `osm`
	__MapOptions__000001_Map1.MaxZoom = 18
	__MapOptions__000001_Map1.ZoomControl = false
	__MapOptions__000001_Map1.AttributionControl = false
	__MapOptions__000001_Map1.ZoomSnap = 1

	// MapOptions values setup
	__MapOptions__000002_Map2.Lat = 45.000000
	__MapOptions__000002_Map2.Lng = 3.000000
	__MapOptions__000002_Map2.Name = `Map2`
	__MapOptions__000002_Map2.ZoomLevel = 5.000000
	__MapOptions__000002_Map2.UrlTemplate = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`
	__MapOptions__000002_Map2.Attribution = `osm`
	__MapOptions__000002_Map2.MaxZoom = 18
	__MapOptions__000002_Map2.ZoomControl = false
	__MapOptions__000002_Map2.AttributionControl = false
	__MapOptions__000002_Map2.ZoomSnap = 1

	// MapOptions values setup
	__MapOptions__000003_Map2.Lat = 45.000000
	__MapOptions__000003_Map2.Lng = 3.000000
	__MapOptions__000003_Map2.Name = `Map2`
	__MapOptions__000003_Map2.ZoomLevel = 5.000000
	__MapOptions__000003_Map2.UrlTemplate = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`
	__MapOptions__000003_Map2.Attribution = `osm`
	__MapOptions__000003_Map2.MaxZoom = 18
	__MapOptions__000003_Map2.ZoomControl = false
	__MapOptions__000003_Map2.AttributionControl = false
	__MapOptions__000003_Map2.ZoomSnap = 1

	// Marker values setup
	__Marker__000000_Dot.Lat = 45.500000
	__Marker__000000_Dot.Lng = 3.700000
	__Marker__000000_Dot.Name = `Dot`
	__Marker__000000_Dot.ColorEnum = models.BLUE

	// Marker values setup
	__Marker__000001_Dot.Lat = 45.500000
	__Marker__000001_Dot.Lng = 3.700000
	__Marker__000001_Dot.Name = `Dot`
	__Marker__000001_Dot.ColorEnum = models.BLUE

	// Marker values setup
	__Marker__000002_Lyon_s_Airport.Lat = 46.000000
	__Marker__000002_Lyon_s_Airport.Lng = 5.500000
	__Marker__000002_Lyon_s_Airport.Name = `Lyon's Airport`
	__Marker__000002_Lyon_s_Airport.ColorEnum = models.GREEN

	// Marker values setup
	__Marker__000003_Lyon_s_Airport.Lat = 46.000000
	__Marker__000003_Lyon_s_Airport.Lng = 5.500000
	__Marker__000003_Lyon_s_Airport.Name = `Lyon's Airport`
	__Marker__000003_Lyon_s_Airport.ColorEnum = models.GREEN

	// Marker values setup
	__Marker__000004_Lyon_s_Radar.Lat = 46.000000
	__Marker__000004_Lyon_s_Radar.Lng = 5.000000
	__Marker__000004_Lyon_s_Radar.Name = `Lyon's Radar`
	__Marker__000004_Lyon_s_Radar.ColorEnum = models.BLUE

	// Marker values setup
	__Marker__000005_Lyon_s_Radar.Lat = 46.000000
	__Marker__000005_Lyon_s_Radar.Lng = 5.000000
	__Marker__000005_Lyon_s_Radar.Name = `Lyon's Radar`
	__Marker__000005_Lyon_s_Radar.ColorEnum = models.BLUE

	// UserClick values setup
	__UserClick__000000_Click_0.Name = `Click !0`
	__UserClick__000000_Click_0.Lat = 46.823233
	__UserClick__000000_Click_0.Lng = 9.746655
	__UserClick__000000_Click_0.TimeOfClick, _ = time.Parse("2006-01-02 15:04:05.999999999 -0700 MST", "2023-10-29 09:28:45.24 +0000 UTC")

	// UserClick values setup
	__UserClick__000001_Click_1.Name = `Click !1`
	__UserClick__000001_Click_1.Lat = 48.210151
	__UserClick__000001_Click_1.Lng = 2.297043
	__UserClick__000001_Click_1.TimeOfClick, _ = time.Parse("2006-01-02 15:04:05.999999999 -0700 MST", "2023-10-29 09:28:57.479 +0000 UTC")

	// VLine values setup
	__VLine__000000_Test_line.StartLat = 46.000000
	__VLine__000000_Test_line.StartLng = 5.000000
	__VLine__000000_Test_line.EndLat = 42.000000
	__VLine__000000_Test_line.EndLng = 6.000000
	__VLine__000000_Test_line.Name = `Test line`
	__VLine__000000_Test_line.ColorEnum = models.RED
	__VLine__000000_Test_line.DashStyleEnum = models.FIVE_TWENTY
	__VLine__000000_Test_line.Message = ``
	__VLine__000000_Test_line.MessageBackward = ``

	// VLine values setup
	__VLine__000001_Test_line.StartLat = 46.000000
	__VLine__000001_Test_line.StartLng = 5.000000
	__VLine__000001_Test_line.EndLat = 42.000000
	__VLine__000001_Test_line.EndLng = 6.000000
	__VLine__000001_Test_line.Name = `Test line`
	__VLine__000001_Test_line.ColorEnum = models.RED
	__VLine__000001_Test_line.DashStyleEnum = models.FIVE_TWENTY
	__VLine__000001_Test_line.Message = ``
	__VLine__000001_Test_line.MessageBackward = ``

	// VisualTrack values setup
	__VisualTrack__000000_Plane_Track.Lat = 43.031852
	__VisualTrack__000000_Plane_Track.Lng = 3.792088
	__VisualTrack__000000_Plane_Track.Heading = 642.000000
	__VisualTrack__000000_Plane_Track.Level = 195.841766
	__VisualTrack__000000_Plane_Track.Speed = 295.841766
	__VisualTrack__000000_Plane_Track.VerticalSpeed = 30.000000
	__VisualTrack__000000_Plane_Track.Name = `Plane Track`
	__VisualTrack__000000_Plane_Track.ColorEnum = models.GREEN
	__VisualTrack__000000_Plane_Track.DisplayTrackHistory = true
	__VisualTrack__000000_Plane_Track.DisplayLevelAndSpeed = true

	// VisualTrack values setup
	__VisualTrack__000001_Plane_Track.Lat = 43.200983
	__VisualTrack__000001_Plane_Track.Lng = 4.587785
	__VisualTrack__000001_Plane_Track.Heading = 594.000000
	__VisualTrack__000001_Plane_Track.Level = 211.755705
	__VisualTrack__000001_Plane_Track.Speed = 311.755705
	__VisualTrack__000001_Plane_Track.VerticalSpeed = 30.000000
	__VisualTrack__000001_Plane_Track.Name = `Plane Track`
	__VisualTrack__000001_Plane_Track.ColorEnum = models.GREEN
	__VisualTrack__000001_Plane_Track.DisplayTrackHistory = true
	__VisualTrack__000001_Plane_Track.DisplayLevelAndSpeed = true

	// VisualTrack values setup
	__VisualTrack__000002_Sat_Track.Lat = 45.000000
	__VisualTrack__000002_Sat_Track.Lng = 5.000000
	__VisualTrack__000002_Sat_Track.Heading = 130.000000
	__VisualTrack__000002_Sat_Track.Level = 200.000000
	__VisualTrack__000002_Sat_Track.Speed = 300.000000
	__VisualTrack__000002_Sat_Track.VerticalSpeed = 30.000000
	__VisualTrack__000002_Sat_Track.Name = `Sat Track`
	__VisualTrack__000002_Sat_Track.ColorEnum = models.GREEN
	__VisualTrack__000002_Sat_Track.DisplayTrackHistory = true
	__VisualTrack__000002_Sat_Track.DisplayLevelAndSpeed = true

	// VisualTrack values setup
	__VisualTrack__000003_Sat_Track.Lat = 45.000000
	__VisualTrack__000003_Sat_Track.Lng = 5.000000
	__VisualTrack__000003_Sat_Track.Heading = 130.000000
	__VisualTrack__000003_Sat_Track.Level = 200.000000
	__VisualTrack__000003_Sat_Track.Speed = 300.000000
	__VisualTrack__000003_Sat_Track.VerticalSpeed = 30.000000
	__VisualTrack__000003_Sat_Track.Name = `Sat Track`
	__VisualTrack__000003_Sat_Track.ColorEnum = models.GREEN
	__VisualTrack__000003_Sat_Track.DisplayTrackHistory = true
	__VisualTrack__000003_Sat_Track.DisplayLevelAndSpeed = true

	// Setup of pointers
	__Circle__000000_Lyon_s_Radar_Range.LayerGroup = __LayerGroup__000004_Radar_Layer
	__Circle__000001_Lyon_s_Radar_Range.LayerGroup = __LayerGroup__000005_Radar_Layer
	__LayerGroupUse__000000_Map1AirportLayerUse.LayerGroup = __LayerGroup__000001_Airport_Layer
	__LayerGroupUse__000001_Map1AirportLayerUse.LayerGroup = __LayerGroup__000000_Airport_Layer
	__LayerGroupUse__000002_Map1RadarLayerUse.LayerGroup = __LayerGroup__000004_Radar_Layer
	__LayerGroupUse__000003_Map1RadarLayerUse.LayerGroup = __LayerGroup__000005_Radar_Layer
	__LayerGroupUse__000004_Map1TracksLayerUse.LayerGroup = __LayerGroup__000007_Tracks_Layer
	__LayerGroupUse__000005_Map1TracksLayerUse.LayerGroup = __LayerGroup__000006_Tracks_Layer
	__LayerGroupUse__000006_Map2RadarLayerUse.LayerGroup = __LayerGroup__000001_Airport_Layer
	__LayerGroupUse__000007_Map2RadarLayerUse.LayerGroup = __LayerGroup__000005_Radar_Layer
	__LayerGroupUse__000008_Map2RadarLayerUse.LayerGroup = __LayerGroup__000004_Radar_Layer
	__LayerGroupUse__000009_Map2RadarLayerUse.LayerGroup = __LayerGroup__000000_Airport_Layer
	__LayerGroupUse__000010_Map2TracksLayerUse.LayerGroup = __LayerGroup__000007_Tracks_Layer
	__LayerGroupUse__000011_Map2TracksLayerUse.LayerGroup = __LayerGroup__000006_Tracks_Layer
	__MapOptions__000000_Map1.LayerGroupUses = append(__MapOptions__000000_Map1.LayerGroupUses, __LayerGroupUse__000000_Map1AirportLayerUse)
	__MapOptions__000000_Map1.LayerGroupUses = append(__MapOptions__000000_Map1.LayerGroupUses, __LayerGroupUse__000003_Map1RadarLayerUse)
	__MapOptions__000000_Map1.LayerGroupUses = append(__MapOptions__000000_Map1.LayerGroupUses, __LayerGroupUse__000005_Map1TracksLayerUse)
	__MapOptions__000001_Map1.LayerGroupUses = append(__MapOptions__000001_Map1.LayerGroupUses, __LayerGroupUse__000001_Map1AirportLayerUse)
	__MapOptions__000001_Map1.LayerGroupUses = append(__MapOptions__000001_Map1.LayerGroupUses, __LayerGroupUse__000002_Map1RadarLayerUse)
	__MapOptions__000001_Map1.LayerGroupUses = append(__MapOptions__000001_Map1.LayerGroupUses, __LayerGroupUse__000004_Map1TracksLayerUse)
	__MapOptions__000002_Map2.LayerGroupUses = append(__MapOptions__000002_Map2.LayerGroupUses, __LayerGroupUse__000009_Map2RadarLayerUse)
	__MapOptions__000002_Map2.LayerGroupUses = append(__MapOptions__000002_Map2.LayerGroupUses, __LayerGroupUse__000008_Map2RadarLayerUse)
	__MapOptions__000002_Map2.LayerGroupUses = append(__MapOptions__000002_Map2.LayerGroupUses, __LayerGroupUse__000010_Map2TracksLayerUse)
	__MapOptions__000003_Map2.LayerGroupUses = append(__MapOptions__000003_Map2.LayerGroupUses, __LayerGroupUse__000006_Map2RadarLayerUse)
	__MapOptions__000003_Map2.LayerGroupUses = append(__MapOptions__000003_Map2.LayerGroupUses, __LayerGroupUse__000007_Map2RadarLayerUse)
	__MapOptions__000003_Map2.LayerGroupUses = append(__MapOptions__000003_Map2.LayerGroupUses, __LayerGroupUse__000011_Map2TracksLayerUse)
	__Marker__000000_Dot.LayerGroup = __LayerGroup__000005_Radar_Layer
	__Marker__000000_Dot.DivIcon = __DivIcon__000013_Dot10
	__Marker__000001_Dot.LayerGroup = __LayerGroup__000004_Radar_Layer
	__Marker__000001_Dot.DivIcon = __DivIcon__000012_Dot10
	__Marker__000002_Lyon_s_Airport.LayerGroup = __LayerGroup__000001_Airport_Layer
	__Marker__000002_Lyon_s_Airport.DivIcon = __DivIcon__000004_Airport
	__Marker__000003_Lyon_s_Airport.LayerGroup = __LayerGroup__000000_Airport_Layer
	__Marker__000003_Lyon_s_Airport.DivIcon = __DivIcon__000002_Airport
	__Marker__000004_Lyon_s_Radar.LayerGroup = __LayerGroup__000005_Radar_Layer
	__Marker__000004_Lyon_s_Radar.DivIcon = __DivIcon__000018_Radar
	__Marker__000005_Lyon_s_Radar.LayerGroup = __LayerGroup__000004_Radar_Layer
	__Marker__000005_Lyon_s_Radar.DivIcon = __DivIcon__000019_Radar
	__VLine__000000_Test_line.LayerGroup = __LayerGroup__000004_Radar_Layer
	__VLine__000001_Test_line.LayerGroup = __LayerGroup__000005_Radar_Layer
	__VisualTrack__000000_Plane_Track.LayerGroup = __LayerGroup__000006_Tracks_Layer
	__VisualTrack__000000_Plane_Track.DivIcon = __DivIcon__000001_Airplane
	__VisualTrack__000001_Plane_Track.LayerGroup = __LayerGroup__000007_Tracks_Layer
	__VisualTrack__000001_Plane_Track.DivIcon = __DivIcon__000000_Airplane
	__VisualTrack__000002_Sat_Track.LayerGroup = __LayerGroup__000007_Tracks_Layer
	__VisualTrack__000002_Sat_Track.DivIcon = __DivIcon__000020_Satellite
	__VisualTrack__000003_Sat_Track.LayerGroup = __LayerGroup__000006_Tracks_Layer
	__VisualTrack__000003_Sat_Track.DivIcon = __DivIcon__000021_Satellite
}


