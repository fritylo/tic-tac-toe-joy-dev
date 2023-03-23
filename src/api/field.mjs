export const X = 'X';
export const O = 'O';
export const $ = '-';

export class Field {
    currentPlayer = X;

    #field = [
        [$, $, $],
        [$, $, $],
        [$, $, $],
    ];
    
    step(x, y) {
        if (this.#field[y-1][x-1] !== $)
            return false;

        this.#field[y-1][x-1] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === X ? O : X;

        return true;
    }

    get isTie() {
        return this.#field.every(
            row => row.every(
                cell => cell !== $
            )
        );
    }

    get isNoWinner() {
        return this.winner === $;
    }

    #cell(x, y) {
        return this.#field[y - 1][x - 1];
    }

    get winner() {
        const players = [X, O];

        const row1 = [this.#cell(1, 1), this.#cell(2, 1), this.#cell(3, 1)];
        const row2 = [this.#cell(1, 2), this.#cell(2, 2), this.#cell(3, 2)];
        const row3 = [this.#cell(1, 3), this.#cell(2, 3), this.#cell(3, 3)];

        const col1 = [this.#cell(1, 1), this.#cell(1, 2), this.#cell(1, 3)];
        const col2 = [this.#cell(2, 1), this.#cell(2, 2), this.#cell(2, 3)];
        const col3 = [this.#cell(3, 1), this.#cell(3, 2), this.#cell(3, 3)];

        const diagLR = [this.#cell(1, 1), this.#cell(2, 2), this.#cell(3, 3)]; 
        const diagRL = [this.#cell(3, 1), this.#cell(2, 2), this.#cell(1, 3)]; 

        const lines = [
            row1, row2, row3,
            col1, col2, col3,
            diagLR, diagRL,
        ];

        const isWinner = function (line, player) {
            return line.every(cell => cell === player);
        };

        for (const player of players) {
            for (const line of lines) {
                if (isWinner(line, player)) return player;
            }
        }

        return $;
    }

    render() {
        let fieldString = '';
            
        for (let i = 0; i < 3; i++) {
            const row = [
                '',
                '',
                '',
            ];

            for (let j = 0; j < 3; j++) {
                const cell = this.#field[i][j];

                let player = '';

                switch (cell) {
                    case X: player += 'X'; break;
                    case O: player += 'O'; break;
                    case $: player += ' '; break;
                }

                row[0] += '┌-' +  '-'   + '-┐';
                row[1] += '| ' + player + ' |';
                row[2] += '└-' +  '-'   + '-┘';
            }

            const rowString = row.join('\n') + '\n';

            fieldString += rowString;
        }

        console.log(fieldString);
    }
}