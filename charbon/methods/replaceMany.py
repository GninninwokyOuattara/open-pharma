def replaceMany(string : str, toReplace : str or list[str], modif : str = "", strip=True) -> str:
    """Replace multiple element in a string by another single element 

    Args:
        string (str): string source with element to be replaced
        toReplace (str orlist[str]): element or list of element that need to be replaced
        modif (str, optional): The string that will replace the element. Defaults to "".
        strip (bool, optional): If the strip method should be applied on the string. Defaults to True.

    Raises:
        TypeError: The string given or the modification required are not string

    Returns:
        str: The source string with the replacement applied
    """
    if not isinstance(string, str) or not isinstance(modif, str):
        raise TypeError
    if isinstance(toReplace, str):
        return string.replace(toReplace, modif).strip() if strip else string.replace(toReplace, modif)
    if isinstance(toReplace, list):
        out : str
        for change in toReplace:
            out = string.replace(change, modif).strip() if strip else string.replace(toReplace, modif)
        return out