export const getEnding = (word: string) => {
    const endingList: {
        [key: string]: string
    } = {
        'а': 'ая',
        'ин': 'ый',
        'я': 'ое',
        'ия': 'ая',
        'он': 'ый',
    };

    const vowels = ['а', 'о', 'и', 'ы', 'э', 'у', 'я', 'ё', 'ю', 'е'];

    const getEndingWord = (word: string) => {
        const characters = word.split('');
        const length = characters.length;

        if (vowels.find( el => el === characters[length-1])) {
            console.log(characters[length-1]);
            if (vowels.find( el => el === characters[length-2])) {
                const ending = [characters[length-2], characters[length-1]].join('');
                return endingList[ending];
            } else {
                const ending = characters[length-1];
                return endingList[ending];
            }
        } else {
            const ending = [characters[length-2], characters[length-1]].join('');
            return endingList[ending];
        };
    }

    return getEndingWord(word);
}