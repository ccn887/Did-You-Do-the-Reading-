const router = require('express').Router();
const {findNonPeopleKeywords} = require('./keywordUtils')
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': process.env.WATSON_UN,
  'password': process.env.WATSON_PW,
  'version_date': '2017-02-27'
});

module.exports = router;

router.post('/keywordQuestion', async (req, res, next) => {
  const text = `Christmas was coming. One morning in mid-December, Hogwarts woke to find
155
itself covered in several feet of snow. The lake froze solid and the
Weasley twins were punished for bewitching several snowballs so that
they followed Quirrell around, bouncing off the back of his turban. The
few owls that managed to battle their way through the stormy sky to
deliver mail had to be nursed back to health by Hagrid before they could
fly off again.
No one could wait for the holidays to start. While the Gryffindor common
room and the Great Hall had roaring fires, the drafty corridors had
become icy and a bitter wind rattled the windows in the classrooms.
Worst of all were Professor Snape's classes down in the dungeons, where
their breath rose in a mist before them and they kept as close as
possible to their hot cauldrons.
"I do feel so sorry," said Draco Malfoy, one Potions class, "for all
those people who have to stay at Hogwarts for Christmas because they're
not wanted at home."
He was looking over at Harry as he spoke. Crabbe and Goyle chuckled.
Harry, who was measuring out powdered spine of lionfish, ignored them.
Malfoy had been even more unpleasant than usual since the Quidditch
match. Disgusted that the Slytherins had lost, he had tried to get
everyone laughing at how a wide-mouthed tree frog would be replacing
Harry as Seeker next. Then he'd realized that nobody found this funny,
because they were all so impressed at the way Harry had managed to stay
on his bucking broomstick. So Malfoy, jealous and angry, had gone back
to taunting Harry about having no proper family.
It was true that Harry wasn't going back to Privet Drive for Christmas.
Professor McGonagall had come around the week before, making a list of
students who would be staying for the holidays, and Harry had signed up
at once. He didn't feel sorry for himself at all; this would probably be
the best Christmas he'd ever had. Ron and his brothers were staying,
too, because Mr. and Mrs. Weasley were going to Romania to visit
Charlie.
When they left the dungeons at the end of Potions, they found a large
fir tree blocking the corridor ahead. Two enormous feet sticking out at
the bottom and a loud puffing sound told them that Hagrid was behind it.
"Hi, Hagrid, want any help?" Ron asked, sticking his head through the
branches.
156
"Nah, I'm all right, thanks, Ron."
"Would you mind moving out of the way?" came Malfoys cold drawl from
behind them. "Are you trying to earn some extra money, Weasley? Hoping
to be gamekeeper yourself when you leave Hogwarts, I suppose -- that hut
of Hagrid's must seem like a palace compared to what your family's used
to."
Ron dived at Malfoy just as Snape came up the stairs.
"WEASLEY!"
Ron let go of the front of Malfoy's robes.
"He was provoked, Professor Snape," said Hagrid, sticking his huge hairy
face out from behind the tree. "Malfoy was insultin' his family."
"Be that as it may, fighting is against Hogwarts rules, Hagrid," said
Snape silkily. "Five points from Gryffindor, Weasley, and be grateful it
isn't more. Move along, all of you."
Malfoy, Crabbe, and Goyle pushed roughly past the tree, scattering
needles everywhere and smirking.
"I'll get him," said Ron, grinding his teeth at Malfoy's back, "one of
these days, I'll get him --"
"I hate them both," said Harry, "Malfoy and Snape."
"Come on, cheer up, it's nearly Christmas," said Hagrid. "Tell yeh what,
come with me an' see the Great Hall, looks a treat."
So the three of them followed Hagrid and his tree off to -the Great
Hall, where Professor McGonagall and Professor Flitwick were busy with
the Christmas decorations.
"Ah, Hagrid, the last tree -- put it in the far corner, would you?"
The hall looked spectacular. Festoons of holly and mistletoe hung all
around the walls, and no less than twelve towering Christmas trees stood
around the room, some sparkling with tiny icicles, some glittering with
hundreds of candles.
157
"How many days you got left until yer holidays?" Hagrid asked.
"Just one," said Hermione. "And that reminds me -Harry, Ron, we've got
half an hour before lunch, we should be in the library."
"Oh yeah, you're right," said Ron, tearing his eyes away from Professor
Flitwick, who had golden bubbles blossoming out of his wand and was
trailing them over the branches of the new tree.
"The library?" said Hagrid, following them out of the hall. "Just before
the holidays? Bit keen, aren't yeh?"
"Oh, we're not working," Harry told him brightly. "Ever since you
mentioned Nicolas Flamel we've been trying to find out who he is."
"You what?" Hagrid looked shocked. "Listen here -- I've told yeh -- drop
it. It's nothin' to you what that dog's guardin'."
"We just want to know who Nicolas Flamel is, that's all," said Hermione.
"Unless you'd like to tell us and save us the trouble?" Harry added. "We
must've been through hundreds of books already and we can't find him
anywhere -- just give us a hint -- I know I've read his name somewhere."
"I'm sayin' nothin, said Hagrid flatly.
"Just have to find out for ourselves, then," said Ron, and they left
Hagrid looking disgruntled and hurried off to the library.
They had indeed been searching books for Flamel's name ever since Hagrid
had let it slip, because how else were they going to find out what Snape
was trying to steal? The trouble was, it was very hard to know where to
begin, not knowing what Flamel might have done to get himself into a
book. He wasn't in Great Wizards of the Twentieth Century, or Notable
Magical Names of Our Time; he was missing, too, from Important Modern
Magical Discoveries, and A Study of Recent Developments in Wizardry. And
then, of course, there was the sheer size of the library; tens of
thousands of books; thousands of shelves; hundreds of narrow rows.
Hermione took out a list of subjects and titles she had decided to
search while Ron strode off down a row of books and started pulling them
off the shelves at random. Harry wandered over to the Restricted
Section. He had been wondering for a while if Flamel wasn't somewhere in
158
there. Unfortunately, you needed a specially signed note from one of the
teachers to look in any of the restricted books, and he knew he'd never
get one. These were the books containing powerful Dark Magic never
taught at Hogwarts, and only read by older students studying advanced
Defense Against the Dark Arts.
"What are you looking for, boy?"
"Nothing," said Harry.
Madam Pince the librarian brandished a feather duster at him.
"You'd better get out, then. Go on -- out!"
Wishing he'd been a bit quicker at thinking up some story, Harry left
the library. He, Ron, and Hermione had already agreed they'd better not
ask Madam Pince where they could find Flamel. They were sure she'd be
able to tell them, but they couldn't risk Snape hearing what they were
up to.
Harry waited outside in the corridor to see if the other two had found
anything, but he wasn't very hopeful. They had been looking for two
weeks, after A, but as they only had odd moments between lessons it
wasn't surprising they'd found nothing. What they really needed was a
nice long search without Madam Pince breathing down their necks.
Five minutes later, Ron and Hermione joined him, shaking their heads.
They went off to lunch.
"You will keep looking while I'm away, won't you?" said Hermione. "And
send me an owl if you find anything."
"And you could ask your parents if they know who Flamel is," said Ron.
"It'd be safe to ask them."
"Very safe, as they're both dentists," said Hermione.
Once the holidays had started, Ron and Harry were having too good a time
to think much about Flamel. They had the dormitory to themselves and the
common room was far emptier than usual, so they were able to get the
good armchairs by the fire. They sat by the hour eating anything they
could spear on a toasting fork -- bread, English muffins, marshmallows
-- and plotting ways of getting Malfoy expelled, which were fun to talk
159
about even if they wouldn't work.
Ron also started teaching Harry wizard chess. This was exactly like
Muggle chess except that the figures were alive, which made it a lot
like directing troops in battle. Ron's set was very old and battered.
Like everything else he owned, it had once belonged to someone else in
his family -- in this case, his grandfather. However, old chessmen
weren't a drawback at all. Ron knew them so well he never had trouble
getting them to do what he wanted.
Harry played with chessmen Seamus Finnigan had lent him, and they didn't
trust him at all. He wasn't a very good player yet and they kept
shouting different bits of advice at him, which was confusing. "Don't
send me there, can't you see his knight? Send him, we can afford to lose
him." On Christmas Eve, Harry went to bed looking forward to the next
day for the food and the fun, but not expecting any presents at all.
When he woke early in the morning, however, the first thing he saw was a
small pile of packages at the foot of his bed.
"Merry Christmas," said Ron sleepily as Harry scrambled out of bed and
pulled on his bathrobe.
"You, too," said Harry. "Will you look at this? I've got some presents!"
"What did you expect, turnips?" said Ron, turning to his own pile, which
was a lot bigger than Harry's.
Harry picked up the top parcel. It was wrapped in thick brown paper and
scrawled across it was To Harry, from Hagrid. Inside was a roughly cut
wooden flute. Hagrid had obviously whittled it himself. Harry blew it --
it sounded a bit like an owl.
A second, very small parcel contained a note.
We received your message and enclose your Christmas present. From Uncle
Vernon and Aunt Petunia. Taped to the note was a fifty-pence piece.
"That's friendly," said Harry.
Ron was fascinated by the fifty pence.
"Weird!" he said, 'NMat a shape! This is money?"
160
"You can keep it," said Harry, laughing at how pleased Ron was. "Hagrid
and my aunt and uncle -- so who sent these?"
"I think I know who that one's from," said Ron, turning a bit pink and
pointing to a very lumpy parcel. "My mom. I told her you didn't expect
any presents and -- oh, no," he groaned, "she's made you a Weasley
sweater."
Harry had torn open the parcel to find a thick, hand-knitted sweater in
emerald green and a large box of homemade fudge.
"Every year she makes us a sweater," said Ron, unwrapping his own, "and
mine's always maroon."
"That's really nice of her," said Harry, trying the fudge, which was
very tasty.
His next present also contained candy -- a large box of Chocolate Frogs
from Hermione.
This only left one parcel. Harry picked it up and felt it. It was very
light. He unwrapped it.
Something fluid and silvery gray went slithering to the floor where it
lay in gleaming folds. Ron gasped.
"I've heard of those," he said in a hushed voice, dropping the box of
Every Flavor Beans he'd gotten from Hermione. "If that's what I think it
is -- they're really rare, and really valuable."
"What is it?"
Harry picked the shining, silvery cloth off the floor. It was strange to
the touch, like water woven into material.
"It's an invisibility cloak," said Ron, a look of awe on his face. "I'm
sure it is -- try it on."
Harry threw the cloak around his shoulders and Ron gave a yell.
"It is! Look down!"
Harry looked down at his feet, but they were gone. He dashed to the
161
mirror. Sure enough, his reflection looked back at him, just his head
suspended in midair, his body completely invisible. He pulled the cloak
over his head and his reflection vanished completely.
"There's a note!" said Ron suddenly. "A note fell out of it!"
Harry pulled off the cloak and seized the letter. Written in narrow,
loopy writing he had never seen before were the following words: Your
father left this in my possession before he died. It is time it was
returned to you. Use it well.
A Very Merry Christmas to you.
There was no signature. Harry stared at the note. Ron was admiring the
cloak.
"I'd give anything for one of these," he said. "Anything. What's the
matter?"
"Nothing," said Harry. He felt very strange. Who had sent the cloak? Had
it really once belonged to his father?
Before he could say or think anything else, the dormitory door was flung
open and Fred and George Weasley bounded in. Harry stuffed the cloak
quickly out of sight. He didn't feel like sharing it with anyone else
yet.
"Merry Christmas!"
"Hey, look -- Harry's got a Weasley sweater, too!"
Fred and George were wearing blue sweaters, one with a large yellow F on
it, the other a G.
"Harry's is better than ours, though," said Fred, holding up Harry's
sweater. "She obviously makes more of an effort if you're not family."
"Why aren't you wearing yours, Ron?" George demanded. "Come on, get it
on, they're lovely and warm."
"I hate maroon," Ron moaned halfheartedly as he pulled it over his head.
162
"You haven't got a letter on yours," George observed. "I suppose she
thinks you don't forget your name. But we're not stupid -- we know we're
called Gred and Forge."
"What's all th is noise.
Percy Weasley stuck his head through the door, looking disapproving. He
had clearly gotten halfway through unwrapping his presents as he, too,
carried a lumpy sweater over his arm, which
Fred seized.
"P for prefect! Get it on, Percy, come on, we're all wearing ours, even
Harry got one."
"I -- don't -- want said Percy thickly, as the twins forced the sweater
over his head, knocking his glasses askew.
"And you're not sitting with the prefects today, either," said
George. "Christmas is a time for family."
They frog-marched Percy from the room, his arms pinned to his side by
his sweater.
Harry had never in all his life had such a Christmas dinner. A hundred
fat, roast turkeys; mountains of roast and boiled potatoes; platters of
chipolatas; tureens of buttered peas, silver boats of thick, rich gravy
and cranberry sauce -- and stacks of wizard crackers every few feet
along the table. These fantastic party favors were nothing like the
feeble Muggle ones the Dursleys usually bought, with their little
plastic toys and their flimsy paper hats inside. Harry pulled a wizard
cracker with Fred and it didn't just bang, it went off with a blast like
a cannon and engulfed them all in a cloud of blue smoke, while from the
inside exploded a rear admiral's hat and several live, white mice. Up at
the High Table, Dumbledore had swapped his pointed wizard's hat for a
flowered bonnet, and was chuckling merrily at a joke Professor Flitwick
had just read him.
Flaming Christmas puddings followed the turkey. Percy nearly broke his
teeth on a silver sickle embedded in his slice. Harry watched Hagrid
getting redder and redder in the face as he called for more wine,
finally kissing Professor McGonagall on the cheek, who, to Harry's
163
amazement, giggled and blushed, her top hat lopsided.
When Harry finally left the table, he was laden down with a stack of
things out of the crackers, including a pack of nonexplodable, luminous
balloons, a Grow-Your-Own-Warts kit, and his own new wizard chess set.
The white mice had disappeared and Harry had a nasty feeling they were
going to end up as Mrs. Norris's Christmas dinner.
Harry and the Weasleys spent a happy afternoon having a furious snowball
fight on the grounds. Then, cold, wet, and gasping for breath, they
returned to the fire in the Gryffindor common room, where Harry broke in
his new chess set by losing spectacularly to Ron. He suspected he
wouldn't have lost so badly if Percy hadn't tried to help him so much.
After a meal of turkey sandwiches, crumpets, trifle, and Christmas cake,
everyone felt too full and sleepy to do much before bed except sit and
watch Percy chase Fred and George all over Gryffindor tower because
they'd stolen his prefect badge.
It had been Harry's best Christmas day ever. Yet something had been
nagging at the back of his mind all day. Not until he climbed into bed
was he free to think about it: the invisibility cloak and whoever had
sent it.`

  const parameters = {
    'text': `${text}`,
    'features': {
      'keywords': {
        'limit': 40
      }
    }
  }

function natLangAsync(param){
      return new Promise(function(resolve,reject){
        natural_language_understanding.analyze(param,function(err,data){
               if(err) return reject(err);
               resolve(data);
           });
      });
  }

  try {

  const keywords = await natLangAsync(parameters)
  const questions = await findNonPeopleKeywords(keywords, text)

  res.send(questions)

  }
  catch(err) {
    console.log('ERROR:', err)
  }
})
 4
