import numpy as np

def checkResult(resultList):

    findedText = []
    for i in range(len(resultList)):
        findedText.append(resultList[i][1])

    print("Finded image_to_text:\n", findedText)

    # TODO прикрутить метрику качества, например scikit-learn или numpy

    return findedText

# очистка текста 	clearedText = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\xff-\n]', '', image_to_text)
# 		clearedText.lower()