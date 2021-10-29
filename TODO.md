```text_preprocessing.py```
Make a frequency analyzer to determine the type of separator (','|';'|'-'|'*' etc)

```admin.py```
make a form for adding a keyword and language
improve the removal of the keyword in different languages
write a function for updating hazard data in the Hazard_GHS table

```db_tools.py```
implement inaccurate search (trigram),
make the search conditional: if the word is not found by exact match, then you need to try to find it by trigrams

```ocr.py```
Find ways to process multiple images simultaneously.
Check the recognized language in the list of available Tesseract otherwise return False.
Process langdetect exception in case of image without text.
Transfer the ocr module to the client side and rewrite it to JavaScript accordingly.

`Database`
Develop parsers for finding and validating synonyms (for example, from Wikipedia) in national languages.
