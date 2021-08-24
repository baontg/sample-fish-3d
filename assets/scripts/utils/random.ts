let Random = {
    range(min: number, max: number): number {
        let num = Math.random() * (max - min) + min;
        return num;
    }
}

export default Random;