// insertion point for imports
import { VisualLayerDB } from './visuallayer-db'
import { VisualIconDB } from './visualicon-db'

// usefull for managing pointer ID values that can be nullable
import { NullInt64 } from './front-repo.service'

export class VisualCenterDB {
	CreatedAt?: string;
	DeletedAt?: string;
	ID?: number;

	// insertion point for basic fields declarations
	Lat?: number
	Lng?: number
	Name?: string
	VisualColorEnum?: string

	// insertion point for other declarations
	VisualLayer?: VisualLayerDB
	VisualLayerID?: NullInt64

	VisualIcon?: VisualIconDB
	VisualIconID?: NullInt64

}
