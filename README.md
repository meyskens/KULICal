# KULICal
KULICal is a small Node.js scrip to get a hosted ICal for your (Associatie) KULeuven schedule by using the Quivr backend.

The idea came after a friend sharing his schedule of UCLL which offered an ICal link. This maked it easy to check your classes in every app that you like.

## Configuration
This app reads the `config.json` file in the same directory. 
```json
{
    "auth":{
        "email": "Quivr email",
        "password": "Quivr password"
    },
    "path": "Path to write the iCal to"
}
```
