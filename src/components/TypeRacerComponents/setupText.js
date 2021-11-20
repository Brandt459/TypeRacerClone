export default function setupText(texts, textIndex) {
    let text = texts[textIndex].text
    text = text.split(' ')
    for (let i = 0; i < text.length; i++) {
      text[i] = text[i].split('')
      text[i].forEach((char, j) => {
        text[i][j] = {'char': char, 'state': 'inactive'}
      })
    }
    let newText = text.slice(0, text.length - 1).reduce((r, a) =>  r.concat(a, {'char': 'space', 'state': 'inactive'}), [])
    text[text.length - 1].forEach(element => {
      newText.push(element)
    })
    return newText
}