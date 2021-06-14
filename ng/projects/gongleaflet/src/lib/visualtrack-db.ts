// insertion point for imports
import { VisualLayerDB } from './visuallayer-db'
import { VisualIconDB } from './visualicon-db'

// usefull for managing pointer ID values that can be nullable
import { NullInt64 } from './front-repo.service'

export class VisualTrackDB {
	CreatedAt?: string;
	DeletedAt?: string;
	ID?: number;

	// insertion point for basic fields declarations
	Lat?: number
	Lng?: number
	Heading?: number
	Level?: number
	Speed?: number
	VerticalSpeed?: number
	Name?: string
	VisualColorEnum?: string
	Display?: string
	DisplayTrackHistory?: string
	DisplayLevelAndSpeed?: string

	// insertion point for other declarations
	VisualLayer?: VisualLayerDB
	VisualLayerID?: NullInt64

	VisualIcon?: VisualIconDB
	VisualIconID?: NullInt64

}
