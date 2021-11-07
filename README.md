# leaflet
### instalation

> cd ng; npm install; ng build
> go run main.go
> firefox localhost:8080


### what you should see

![gongleaflet_example](gongleaflet_example.png)

# Import this stack

add to dev dependencies of your package.json
```json
        "backbone": "^1.4.0",
        "jointjs": "^3.2.0",
        "jquery": "^3.5.1",
        "lodash": "^4.17.20",
        "@types/backbone": "^1.4.5",
        "@types/jointjs": "^2.0.0",
        "@types/jquery": "^3.5.3",
        "@types/lodash": "^4.14.162"
```

and add the following path in your tsconfig.json

```json
      "jointjs": [
        "./node_modules/jointjs"
      ],
      "@types/jointjs": [
        "./node_modules/@types/jointjs"
      ],
```