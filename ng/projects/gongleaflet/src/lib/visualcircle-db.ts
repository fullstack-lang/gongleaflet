// insertion point for imports
import { VisualLayerDB } from './visuallayer-db'
import { VisualMapDB } from './visualmap-db'

// usefull for managing pointer ID values that can be nullable
import { NullInt64 } from './null-int64'

export class VisualCircleDB {
	CreatedAt?: string
	DeletedAt?: string
	ID: number = 0

	// insertion point for basic fields declarations
	Lat: number = 0
	Lng: number = 0
	Name: string = ""
	Radius: number = 0
	VisualColorEnum: string = ""
	DashStyleEnum: string = ""

	// insertion point for other declarations
	VisualLayer?: VisualLayerDB
	VisualLayerID: NullInt64 = new NullInt64 // if pointer is null, VisualLayer.ID = 0

	VisualMap_VisualCirclesDBID: NullInt64 = new NullInt64
	VisualMap_VisualCirclesDBID_Index: NullInt64  = new NullInt64 // store the index of the visualcircle instance in VisualMap.VisualCircles
	VisualMap_VisualCircles_reverse?: VisualMapDB 

}
