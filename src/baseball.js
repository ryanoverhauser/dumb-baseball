// The names list
const names = require('../names.json')

// Whitelist matches will not be swapped
const whitelist = ['mc']

// Swappable groups for wonkification
const clusters = ['bl','br','ch','ck','cl','cr','dr','fl','fr','gh','gl','gr','ng','ph','pl','pr','qu','sc','sh','sk','sl','sm','sn','sp','st','sw','th','tr','tw','wh','wr']
const doubleVowels = ['aa','ee','ii','oo','uu']
const doubleConsonants = ['gg','nn','ff','mm','ll','rr','tt','pp','ss','dd','zz','bb']
const vowels = ['a','e','i','o','u']
const consonants = ['b','c','d','e','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']

/**
 * Return a random item from a given array
 */
const getRandom = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Find the next node match in the name
 */
const nextNode = function(letters) {
    let testNode, length, type
    if (letters.length > 1) {
        testNode = (letters[0] + letters[1]).toLowerCase()
        if (whitelist.includes(testNode)) {
            return getNode(letters, 2, 'wl')
        }
        if (doubleVowels.includes(testNode)) {
            return getNode(letters, 2, 'dv')
        }
        if (doubleConsonants.includes(testNode)) {
            return getNode(letters, 2, 'dc')
        }
        if (clusters.includes(testNode)) {
            return getNode(letters, 2, 'cl')
        }
    }
    testNode = letters[0].toLowerCase()
    if (vowels.includes(testNode)) {
        return getNode(letters, 1, 'v')
    }
    if (consonants.includes(testNode)) {
        return getNode(letters, 1, 'c')
    }
    return getNode(letters, 1, 'wl')
}

/**
 * Splice a node off a given array
 */
const getNode = function(letters, count, type) {
    let text = letters.splice(0, count).join('')
    let format = [...text].map(l => (l == l.toLowerCase()) ? 0 : 1)
    return {
        text: text,
        format: format,
        type: type,
    }
}

/**
 * Re-capitalize letters after swapping node text
 */
const reformatNode = function(node) {
    node.text = [...node.text].map((letter, index) => {
        return node.format[index] ? letter.toUpperCase() : letter.toLowerCase()
    }).join('')
    return node
}

/**
 * Replace node text with random value
 */
const swapNode = function(node) {
    if (node.type !== 'wl') {
        switch (node.type){
            case 'dv':
                node.text = getRandom(doubleVowels);
                break;
            case 'dc':
                node.text = getRandom(doubleConsonants);
                break;
            case 'cl':
                node.text = getRandom(clusters);
                break;
            case 'c':
                node.text = getRandom(consonants);
                break;
            case 'v':
                node.text = getRandom(vowels);
                break;
        }
    }
    return reformatNode(node);
}

/**
 * Just fuck my shit up
 */
const wonkify = function(name, wonkiness = 0.2) {
    // get an array of the letters in the name
    let letters = [...name]

    // parse letter array into swappable nodes
    let nodes = []
    while (letters.length) {
        nodes.push(nextNode(letters))
    }

    // swap nodes at random
    nodes = nodes.map( (node) => {
        if (Math.random() < wonkiness) {
            node = swapNode(node)
        }
        return node
    })

    // convert nodes into a single string
    return nodes.map(c => c.text).join('')
}

export default () => {
    let name = getRandom(names.firstNames) + ' ' + getRandom(names.lastNames)
    return wonkify(name)
}
