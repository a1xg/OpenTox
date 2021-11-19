# numbers of chemical substances
RE_MASKS = {
    'colourIndex': r'([Cc]\.?[Iil1]\.?\s?\d{5})',           # Colour Index nums like CI 00000
    'casNumbers': r'(\d{2,6}-\d{2}-\d{1})',                 # Chemical abstract nums
    'ecNumbers': r'(\d{3}-\d{3}-\d{1})',                    # EINECS nums like 000-000-0
    'eNumber': r'([£FEe]\-?\d{3}[\d\w]|[£FEe]\-?\d{3})',    # E numbers food additives, like E000
    'GHS_codes': r'H\d{3}',                                 # Global harmonized safety nums, like H335
    'inchiKey': r'[A-Z]{14}-[A-Z]{10}-[A-Z]'                # INCHI - the international google'ble registration code
}
