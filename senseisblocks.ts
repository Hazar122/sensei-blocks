
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
            if (_handler) _handler(mouseX(), mouseY());
        }, 16);
    }
    __init();

    //% blockId=browserEvents_onLeftClick
    //% block="on left mouse button pressed $x $y"
    //% draggableParameters="reporter"
    //% group="Mouse"
    //% weight=100
    export function onLeftClick(handler: (x: number, y: number) => void) {
        _handler = handler;
    }

}