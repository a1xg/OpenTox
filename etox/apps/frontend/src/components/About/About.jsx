import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ItemCard from '../ItemCard/ItemCard.jsx';
import { Stack } from '@mui/material';
import useStyles from './styles.js';

const About = (props) => {
    const classes = useStyles();
    return (
        <Container>
            <ItemCard>
                <Box className={classes.contentWrapper}>
                    <Typography variant='h6'>About OpenTox</Typography>
                    <Box className={classes.textWrapper}>
                        <Typography variant='body1'>
                            OpenTox - сервис для оценки потенциального вреда для здоровья человека пищевых добавок и компонентов косметики.
                            Мы распознаем ингредиенты на английском языке, а так-же Е### номера и CI-##### номера.
                        </Typography>
                    </Box>
                    <Typography variant='h6'>Наша цель</Typography>
                    <Box className={classes.textWrapper}>
                        <Typography variant='body1'>
                            OpenTox упрощает оценку рисков для здоровья конкретного пищевого продукта или косметического
                            средства используя сложные расчеты основанные на большом количестве научных данных о токсикологии, и
                            преобразование этих данных их в понятные и простые шкалы оценки рисков по каждому ингредиенту и продукту в целом.
                            Вам не придется пользоваться гуглом, и читать статьи на википедии по каждому ингредиенту, мы это сделаем за вас.
                        </Typography>
                    </Box>
                    <Typography variant='h6'>Рейтинг Opentox</Typography>
                    <Box className={classes.textWrapper}>
                        <Typography variant='body1'>
                            OpenTox рейтинг рассчитывается на основе данных из системы GHS.
                            Рейтинг ингредиента вычисляется, как среднее арифметическим взвешенное, учитывая класс опасности для человека
                            уровень опасности внутри класса.
                            Рейтинг продукта вычисляется, как среднее арифметическое рейтинга его ингредиентов.
                        </Typography>
                    </Box>
                    <Typography variant='h6'>Система GHS</Typography>
                    <Box className={classes.textWrapper}>
                        <Typography variant='body1'>
                            <p>
                                В качестве критериев оценки вреда для здоровья мы используем Согласованную на глобальном уровне
                                система классификации и маркировки химических веществ (GHS)
                                <Link href='https://unece.org/about-ghs' >
                                    <Typography variant='caption'>[1]</Typography>
                                </Link>, разработанную Организацией объединенных наций.
                                Сама по себе система GHS была создана по причине того, что в разных странах мира существуют свои системы
                                и критерии оценки опасности химических компонентов.
                            </p>
                            <p>
                                В эпоху глобальной международной торговли вещества
                                запрещенные к применению в одной стране на пример по причине канцерогенности, могли совершенно спокойно
                                использоваться в другой стране, что вызывало много путаницы и рисков для здоровья конечных потребителей.
                            </p>
                        </Typography>
                    </Box>
                    <Typography variant='h6'>Cистема CLP и проблема ее внедрения</Typography>
                    <Box className={classes.textWrapper}>
                        <Typography variant='body1'>
                            <p>
                                Регламент классификации, маркировки и упаковки (CLP)
                                <Link href='https://echa.europa.eu/regulations/clp/understanding-clp'>
                                    <Typography variant='caption'>[2]</Typography>
                                </Link>,
                                основанный на системе GHS был введен для стран евросоюза в 2008 году.
                                Регламент CLP обязывает производителей и импортеров химических веществ и их смесей(продуктов) наносить
                                на упаковке информацию о возможных рисках для здоровья и окружающей среды согласно системе GHS.
                                Так-же регламент обязывет регистрировать информацию о рисках в специльном публичном
                                <Link href='https://echa.europa.eu/information-on-chemicals/cl-inventory-database/'> реестре</Link>, в котором данные агрегирутся
                                и позволяют объективно, непредвзято и максимально демократично оценить риски того или иного вещества,
                                избежать ошибок в классификации.
                            </p>
                            <p>
                                К сожалению в регламенте CLP косметические продукты имеют особый статус и их производители пока не обязаны наносить на
                                упаковку информацию о рисках согласно GHS.
                                Внедрение системы GHS для косметических продуктов и требования наносить на упаковке информационные надписи на данный момент
                                только обсуждается и находится в зачаточной стадии.
                                Государственные организации осуществляющие контроль за использованием ингредиентов косметики как правило лишь констатируют
                                применение тех или иных компонентов производителями, но запретить производителям использовать небезопасный компонент
                                оказывается непростой задачей, требующей проведения длительных научных исследований подтверждающих вредное влияние на
                                здоровье человека. Немного лучше ситуация с Е-добавками, однако некоторые из них были разрешены десятки лет назад,
                                но потом были запрещены во многих странах мира, когда появилось достаточное количество научных данных об их опасности.
                            </p>
                            Таким образом на сегодня производители и импортеры косметики:
                            не обязаны наносить маркировку опасности ингредиентов.
                            могут использовать в производстве любой компонент, который еще не успели законодательно запретить,
                            но по которым уже давно известны риски.
                            <Link href='https://link.springer.com/article/10.1186/2190-4715-24-37' >
                                <Typography variant='caption'>[3]</Typography>
                            </Link>
                        </Typography>
                    </Box>
                    <Typography variant='h6'>Sources: </Typography>
                    <Box className={classes.textWrapper} style={{ border: 'none', paddingTop: 0 }}>
                        <Stack direction='column' spacing={1}>
                            <Typography variant='caption'>
                                <b>[1]</b>
                                <Link href='https://unece.org/about-ghs'> Globally Harmonized System of Classification and Labelling of Chemicals (GHS)</Link>
                            </Typography>
                            <Typography variant='caption'>
                                <b>[2]</b>
                                <Link href='https://echa.europa.eu/regulations/clp/understanding-clp'>
                                    Classification, Labelling and Packaging (CLP) Regulation
                                </Link>
                            </Typography>
                            <Typography variant='caption'>
                                <b>[3]</b> Klaschka U: Risk management by labelling 26 fragrances?- Evaluation of Article 10 (1) of the seventh amendment (Guideline 2003/15/EC) of the cosmetic directive.J Hyg Environ Health 2010, 213: 308–320.
                                <Link href='https://link.springer.com/article/10.1186/2190-4715-24-37'>
                                    DOI:10.1016/j.ijheh.2010.04.001
                                </Link>
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </ItemCard>
        </Container >
    )
};

export default About;
