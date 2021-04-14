// insertion point for imports
import { VisualLayerDB } from './visuallayer-db'

// usefull for managing pointer ID values that can be nullable
import { NullInt64 } from './front-repo.service'

export class VisualLineDB {
	CreatedAt?: string;
	DeletedAt?: string;
	ID?: number;

	// insertion point for basic fields declarations
	StartLat?: number
	StartLng?: number
	EndLat?: number
	EndLng?: number
	Name?: string
	VisualColorEnum?: string
	DashStyleEnum?: string
	IsTransmitting?: string
	Message?: string
	IsTransmittingBackward?: string
	MessageBackward?: string

	// insertion point for other declarations
	VisualLayer?: VisualLayerDB
	VisualLayerID?: NullInt64
	VisualLayerName?: string

}
