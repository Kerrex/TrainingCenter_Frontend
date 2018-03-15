export class FatUtils {
    /* All measurements in centimeters */
    static calculateWomanFat(height: number, waist: number, neck: number, hips: number): string {
        let logWaistNeck = Math.log(waist - neck) / Math.LN10;
        let logHeight = Math.log(height) / Math.LN10;
        let logWomanWaistHipsNeck = Math.log(waist + hips - neck) / Math.LN10;

        let bodyDensity = (1.29579 - (0.35004 * logWomanWaistHipsNeck) + (0.221 * logHeight));
        let totalFat = (495 / bodyDensity - 450);
        
        return totalFat.toFixed(0);
    }

    static calculateManFat(height: number, waist: number, neck: number): string {
        let logWaistNeck = Math.log(waist - neck) / Math.LN10;
        let logHeight = Math.log(height) / Math.LN10;

        let bodyDensity = (1.0324 - (0.19077 * logWaistNeck) + (0.15456 * logHeight));
        let totalFat = (495 / bodyDensity - 450);

        return totalFat.toFixed(0);
    }
}