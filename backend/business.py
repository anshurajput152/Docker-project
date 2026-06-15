def get_data():

    with open('name.txt') as f:
        names = f.read()
        names = names.split()
        return names