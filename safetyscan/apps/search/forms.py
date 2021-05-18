from django import forms


class UploadImageForm(forms.Form):
    #title = forms.CharField(max_length=50)
    image = forms.FileField()


class TextRequestForm(forms.Form):
    text = forms.CharField(widget=forms.Textarea(attrs={
        'rows': 4,
        'cols': 60,
        'placeholder': 'Введите компоненты через запятую'
    }), max_length=3000)