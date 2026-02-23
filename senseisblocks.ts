
//% color=#ED5B00 weight=100 icon="\uf0f4" block="Sensei's Blocks"
namespace senseisBlocks {

    const CHAR_LOOKUP: string[] = [
        "0", "1", "2", "3", "4", "5", "6", "7",
        "8", "9", "A", "B", "C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U", "V",
        "W", "X", "Y", "Z"
    ]

    /**
     * Convert a number from base 10 to another base (2-36)
     */
    //% blockId=senseis_convert_to_base
    //% block="convert number $num to base $base"
    //% subcategory="Base Converter"
    //% base.min=2 base.max=36 base.defl=16
    //% weight=80
    export function convertNumberToBase(num: number, base: number): string {
        if (base < 2 || base > 36) return "error: base must be 2-36"
        if (num === 0) return "0"
        let mods: string[] = []
        let n = Math.abs(Math.floor(num))
        while (n > 0) {
            mods.push(CHAR_LOOKUP[n % base])
            n = Math.floor(n / base)
        }
        if (num < 0) mods.push("-")
        mods.reverse()
        return mods.join("")
    }

    /**
     * Convert a value from a given base (2-36) back to base 10
     */
    //% blockId=senseis_convert_from_base
    //% block="convert $value from base $base to base 10"
    //% subcategory="Base Converter"
    //% base.min=2 base.max=36 base.defl=16
    //% weight=79
    export function convertBackToBase10(value: string, base: number): number {
        return parseInt(value, base)
    }

    //% blockId=senseis_set_convert_to_base
    //% block="convert number $num to base $base"
    //% subcategory="Base Converter"
    //% base.min=2 base.max=36 base.defl=16
    //% blockSetVariable=result
    //% weight=78
    export function setConvertNumberToBase(num: number, base: number): string {
        return convertNumberToBase(num, base)
    }

    //% blockId=senseis_set_convert_from_base
    //% block="convert $value from base $base to base 10"
    //% subcategory="Base Converter"
    //% base.min=2 base.max=36 base.defl=16
    //% blockSetVariable=result
    //% weight=77
    export function setConvertBackToBase10(value: string, base: number): number {
        return convertBackToBase10(value, base)
    }


    


    const INTERNAL_POINTER_DOWN = 6868;
    type MouseHandler = (x: number, y: number) => void;
    let _handler: MouseHandler;

    function __init() {
        control.internalOnEvent(INTERNAL_POINTER_DOWN, 1, () => {
            if (_handler) _handler(browserEvents.mouseX(), browserEvents.mouseY());
        }, 16);
    }
    __init();

    //% blockId=senseis_onLeftClick
    //% block="on left mouse button pressed $x $y"
    //% draggableParameters="reporter"
    //% subcategory="Mouse"
    //% weight=100
    export function onLeftClick(handler: (x: number, y: number) => void) {
        _handler = handler;
    }

    //% block="is x $x y $y between x1 $xpos1 y1 $ypos1 x2 $xpos2 y2 $ypos2"
    //% subcategory="Mouse"
    //% inlineInputMode=inline
    //% weight=99
    export function isBetweenCoords(
        x: number, y: number,
        xpos1: number, xpos2: number,
        ypos1: number, ypos2: number
    ): boolean {
        return (x >= xpos1 && x <= xpos2 && y >= ypos1 && y <= ypos2)
    }

    /**
     * Convert a string to upper case
     */
    //% block="string $str to upper case"
    //% subcategory="String"
    //% weight=90
    export function stringToUpper(str: string): string {
        return str.toUpperCase();
    }

    /**
     * Convert a string to lower case
     */
    //% block="string $str to lower case"
    //% subcategory="String"
    //% weight=89
    export function stringToLower(str: string): string {
        return str.toLowerCase();
    }

    /**
     * Convert a number to a string
     */
    //% block="number $num to string"
    //% subcategory="String"
    //% weight=88
    export function numToString(num: number): string {
        return num.toString();
    }

    /**
     * Reverse a string
     */
    //% block="reverse string $str"
    //% subcategory="String"
    //% weight=87
    export function reverseString(str: string): string {
        let result = ""
        for (let i = str.length - 1; i >= 0; i--) {
            result += str.charAt(i)
        }
        return result
    }

    /**
     * Repeat a string N times
     */
    //% block="repeat string $str $times times"
    //% subcategory="String"
    //% times.min=1 times.defl=2
    //% weight=86
    export function repeatString(str: string, times: number): string {
        let result = ""
        for (let i = 0; i < times; i++) {
            result += str
        }
        return result
    }

    /**
     * Check if string contains a substring
     */
    //% block="string $str contains $sub"
    //% subcategory="String"
    //% weight=85
    export function stringContains(str: string, sub: string): boolean {
        return str.indexOf(sub) >= 0
    }

    /**
     * Replace all occurrences of a substring
     */
    //% block="in $str replace $find with $replaceWith"
    //% subcategory="String"
    //% inlineInputMode=inline
    //% weight=84
    export function stringReplace(str: string, find: string, replaceWith: string): string {
        let result = ""
        let i = 0
        while (i < str.length) {
            let match = true
            for (let j = 0; j < find.length; j++) {
                if (i + j >= str.length || str.charAt(i + j) !== find.charAt(j)) {
                    match = false
                    break
                }
            }
            if (match && find.length > 0) {
                result += replaceWith
                i += find.length
            } else {
                result += str.charAt(i)
                i++
            }
        }
        return result
    }

    /**
     * Pad a string on the left to reach desired length
     */
    //% block="pad $str to length $len with $padChar"
    //% subcategory="String"
    //% len.defl=5 padChar.defl="0"
    //% weight=83
    export function padLeft(str: string, len: number, padChar: string): string {
        let result = str
        while (result.length < len) {
            result = padChar + result
        }
        return result
    }

    /**
     * Count occurrences of a character in a string
     */
    //% block="count $char in $str"
    //% subcategory="String"
    //% weight=82
    export function countChar(char: string, str: string): number {
        let count = 0
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === char) count++
        }
        return count
    }




    /**
     * Create a sprite that is automatically scaled down to fit in 16x16
     */
    //% block="create scaled sprite $img of kind $kind"
    //% img.shadow=screen_image_picker
    //% kind.shadow=spritekind
    //% blockSetVariable=mySprite
    //% subcategory="Sprite"
    //% weight=70
    export function createScaledSprite(img: Image, kind?: number): Sprite {
        const scene = game.currentScene();
        const sprite = new Sprite(img)
        sprite.setKind(kind);
        scene.physicsEngine.addSprite(sprite);
        scene.createdHandlers
            .filter(h => h.kind == kind)
            .forEach(h => h.handler(sprite));
        if (img.height > 16 && img.height >= img.width) {
            sprite.setScale(16 / img.height)
        } else if (img.width > 16 && img.width > img.height) {
            sprite.setScale(16 / img.width)
        }
        return sprite
    }


    
    export enum GameStates {
        Playing,
        Paused
    }
    
    let state = GameStates.Playing

    //% block="is game paused"
    //% subcategory="Pause"
    //% weight=70
    export function isGamePaused(): Boolean{
        return state == GameStates.Paused
    }

    //% block="toggle game pause state"
    //% subcategory="Pause"
    //% weight=70
    export function togglePause() {
        if (state == GameStates.Playing) {
            state = GameStates.Paused
        } else {
            state = GameStates.Playing
        }
    }
}