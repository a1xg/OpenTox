from django import forms


class UploadImageForm(forms.Form):
    image = forms.FileField(
        widget=forms.FileInput(
            attrs={
                'onchange': 'submit();',
                'placeholder': 'Select product photo',
                #'class': 'search-form'
            }
        ),
        label=''
    )


class TextRequestForm(forms.Form):
    text = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Enter ingredients separated by commas',
                'class': 'search-form'
            }
        ),
        max_length=2000,
        label=''
    )
