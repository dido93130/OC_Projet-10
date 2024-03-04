// Fonction getMonth pour convertir une date en mois en français
function getMonth(dateString) {
    const months = {
        "01": "janvier",
        "02": "février",
        "03": "mars",
        "04": "avril",
        "05": "mai",
        "06": "juin",
        "07": "juillet",
        "08": "août",
        "09": "septembre",
        "10": "octobre",
        "11": "novembre",
        "12": "décembre"
    };
    const monthString = dateString.split("-")[1];
    return months[monthString];
}

// Test de la fonction getMonth
describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const result = getMonth("2022-01-01");
            expect(result).toEqual("janvier");
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            const result = getMonth("2022-07-08");
            expect(result).toEqual("juillet");
        });
    });
});

