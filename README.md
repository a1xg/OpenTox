## OpenTox

The OpenTox project was conceived as an Android application written using the Kivy framework for python, performing label recognition on the client side. Unfortunately, the community of this framework is not yet large enough to cover the entire range of problems that arise when assembling an application and resolve all problems with assembling an environment written in low-level C/C++ (computer vision libraries, OCR). Considering my little development experience at that time, it was decided to continue development on the Python/Django stack with a front-end on React.js, and perform text recognition on the server. In the future, you can try to move the text recognition module to the client side and seriously relieve the server, if all the libraries necessary for OCR and Python are also localized for JavaScript.

### Database architecture
PostgreSQL was chosen as the project database as it most fully meets the technical requirements of the project:
Each substance can have up to a hundred synonyms in English alone, and there can also be several
duplicate identifiers, and several danger classes, which makes it difficult to use the classic relational
data storage approach, and scaling the project to a multilingual one is simply impossible. Used for these purposes
JSONB format and GIN indexes, which made it possible to store an arbitrary number of keys and values in 1 table cell,
but almost without losing the speed of searching through JSONB keys and arrays, which approaches the speed of reading relational tables.
In the future, it is planned to create trigram indexes for JSONB fields and use the possibility of inexact search in the database,
which is especially important when searching for text obtained by OCR and containing errors.

### Data engeneering and assembling the ingredient database
The following were used to create the service ingredient database:
* Substances Added to Food(U.S. Food and Drug Administration)
* COSING(European Commission) 
* EUCOSMETICS (NORMAN Suspect List Exchange)

The quality of the source data did not always correspond to a single standard and contained extra characters and errors, therefore
the data was pre-processed by Pandas/Regex. Some data (synonyms and identification numbers)
extracted using parsing [PubChem](https://pubchem.ncbi.nlm.nih.gov/) using requests and BeautifulSoup
and also underwent cleaning.
To combine data from different sources, several types of synonym validation were used in parallel,
identifiers and imprecise matches (Python fuzzywuzzy lib) and ultimately the number of ingredients used in the food and cosmetics industry was approximately 28,000.
### Collection of ingredient hazard data

Chemical Hazard Data (GHS) was extracted from the database [European chemistry agency](https://echa.europa.eu/information-on-chemicals/cl-inventory-database/)
(~185000 components) using parsing and using multithreading (Python multiprocessing).
The CLP database contains various ingredients and lists of their hazard classes, as well as the number of organizations that have declared
that the ingredient has these hazard classes. The data in the database tables also had deviations from the standard format,
therefore, it was necessary to write complex algorithms for data extraction, their further correction and aggregation before adding
to the project database. Data from the CLP database was also combined with the already collected ingredient database.
Technologies involved: requests, bs4, lxml(xpath), Pandas.

### Data normalization
The raw ingredient hazard data was not suitable for display to the user and was normalized in several
relational tables. [Classification GHS](https://www.hsa.ie/eng/Publications_and_Forms/Publications/Chemical_and_Hazardous_Substances/CLP_Regulation_No_1272-2008_A4_Poster_I.pdf) represents a hazard class (e.g. skin irritant, carcinogen) and
hazard categories (scores from 1 to 2, 3 or 4 sometimes with letters), the lower the number, the more serious
the ingredient poses the risk. For example Carc. 1A, means carcinogenic
level 1A. Of course, such a classifier would be too complex to show to the end user,
therefore, categories within each class were normalized to a 10-point system
(added an additional field to the database).
Technologies involved: psycopg2, Regex.

### Aggregation
The hazard_assessor module, in turn, filters CLP data with a very small number of notifications
about dangers that are most likely unreliable. For example, if 1 in 100 companies reported that
the ingredient is a Category 2 eye irritant, such data will be excluded. The cleared data passes
several aggregations and generalizations to give a rating of the ingredient and the entire product.

### OCR
OpenTox uses previously developed software to extract text from labels [OCR module](https://github.com/a1xg/OCR-pipeline-for-product-labels)
This module does not extract the entire text, but breaks it down into paragraphs, which makes it possible to determine the language within a paragraph with a high degree of probability. For example, for cosmetics packages supplied to Ukraine or Russia, very often the list of ingredients is written in English, while the rest of the packaging is written in Russian or Ukrainian, so in order to determine the language of the text and implement multilingual text recognition, it is necessary to first split it into at least paragraphs.
Recognized text paragraphs are cleaned in text_postprocessing.py and then sent to the database; the text paragraph with the largest number of ingredients found in the database is the product composition and is used further in the risk assessment module (hazard_assessor.py).