// insertion point for imports
import { VisualCenterDB } from './visualcenter-db'
import { VisualCircleDB } from './visualcircle-db'
import { VisualLineDB } from './visualline-db'
import { VisualTrackDB } from './visualtrack-db'

// usefull for managing pointer ID values that can be nullable
import { NullInt64 } from './null-int64'

export class VisualMapDB {
	CreatedAt?: string
	DeletedAt?: string
	ID: number = 0

	// insertion point for basic fields declarations
	Lat: number = 0
	Lng: number = 0
	Name: string = ""
	ZoomLevel: number = 0
	UrlTemplate: string = ""
	Attribution: string = ""
	MaxZoom: number = 0
	ZoomControl: boolean = false
	AttributionControl: boolean = false
	ZoomSnap: boolean = false

	// insertion point for other declarations
	VisualCenters?: Array<VisualCenterDB>
	VisualCircles?: Array<VisualCircleDB>
	VisualLines?: Array<VisualLineDB>
	VisualTracks?: Array<VisualTrackDB>
}
