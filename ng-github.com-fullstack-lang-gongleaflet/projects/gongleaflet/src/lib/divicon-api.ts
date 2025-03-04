// insertion point for imports

// usefull for managing pointer ID values that can be nullable
import { NullInt64 } from './null-int64'

export class DivIconAPI {

	static GONGSTRUCT_NAME = "DivIcon"

	CreatedAt?: string
	DeletedAt?: string
	ID: number = 0

	// insertion point for basic fields declarations
	Name: string = ""
	SVG: string = ""

	// insertion point for other decls

	DivIconPointersEncoding: DivIconPointersEncoding = new DivIconPointersEncoding
}

export class DivIconPointersEncoding {
	// insertion point for pointers and slices of pointers encoding fields
}
