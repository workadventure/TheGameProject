# Translations

## To add translation language
In this directory, to add translation languages, you can dupplicate the en-US directory and name it with the wanted translation name.
Then, in the src/utils/translate.ts file, you can add your translation to acceptedPlayerLanguages variable

**(NOTE : It's maybe possible to detect all folder in directory and automatiza accepted player languages --> TO OPTIMIZE)**

## To add translations to existing language folder

You are free to add translations in utils.ts file, but you can add as many file as you want in the translation directories.
When you add a translation file to your translation directory, you must add it in the index.ts.