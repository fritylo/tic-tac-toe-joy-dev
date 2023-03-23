import { question } from './api/rl.mjs';
import { Field } from './api/field.mjs';

import IMG_Kitty from './assets/kitty.mjs';
import IMG_Sasuke from './assets/sasuke.mjs';
import IMG_Chicken from './assets/chicken.mjs';

async function main() {
    console.log(
        '\n' +
       'Добро пожаловать в игру "Крестики-Нолики"' + '\n' +
       '© Валерия Ехно, Иван Захарьян, Федор Никонов - 23.03.2023' + '\n'
    );

    console.log('\n' + IMG_Kitty);

    console.log();
    await question('Нажимая "Enter" вы принимаете условия использования ПО >>');

    const field = new Field();

    let successStep = true;

    while (field.isNoWinner && !field.isTie) {
        console.log();
        console.log('===============')

        field.render();

        const player = field.currentPlayer;

        if (!successStep) {
            console.log(
                '\n' +
                `Наш дорогой игрок "${player}",` + '\n' +
                'так нельзя походить))' + '\n' +
                '\n'
            );
        }

        console.log(`ХОДИТ: [ ${player} ]. Куда нада?`);

        const answer = await question('x y: ');
        const [x, y] = answer.split(/\s+/).map(n => +n);

        successStep = field.step(x, y);
    }

    console.log();
    console.log('===============')

    field.render();

    if (field.isTie) {
        console.log();
        console.log(`Господа, это ничья!!!`);

        console.log();
        await question('Нажми "Enter" чтобы получить УТЕШИТЕЛЬНЫЙ приз!!! >>');

        console.log();
        console.log(IMG_Chicken);
    } else {
        console.log();
        console.log(`Поздравляем!!! Победитель "${field.winner}"`);

        console.log();
        await question('Нажми "Enter" чтобы получить приз!!! >>');

        console.log(IMG_Sasuke);
    }
}

main()
    .then(() => process.exit())
    .catch((err) => {
        console.log(`Произошла ошибка: ${err.message}... Дорогой друг, не воспринимай близко к сердцу!`);
        process.exit();
    });
