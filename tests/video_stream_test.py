import cv2
from text_detection.text_extractor import TextExtractor

class VideoStream:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.cap = cv2.VideoCapture(0)
        self.cap.set(10,150)

    def streamShowBoxes(self):

        while True:
            # Считываем изображение с камеры
            success, screen = self.cap.read()
            screen = cv2.resize(screen,(self.width,self.height))

            selected_text = TextExtractor(screen)

            cv2.imshow("Select image_to_text", selected_text.drawBoxes())
            #cv2.waitKey(0)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break


realtime = VideoStream(width=640, height=640)
realtime.streamShowBoxes()