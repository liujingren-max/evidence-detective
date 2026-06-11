import type { CaseData } from '../types'

export const catsVsDogs: CaseData = {
  id: 'cats-vs-dogs',
  caseNo: 'Case 001',
  title: 'Cats vs. dogs',
  prompt: 'Which makes the better pet — a cat or a dog?',
  briefing:
    'A letter from the Henderson family: “Our family is split down the middle. Half of us want a cat, half want a dog, and nobody will budge. Detective — search our living room and kitchen. The evidence of life with both pets is all there. Tell us honestly: which makes the better pet?”',
  sides: [
    {
      id: 'cat',
      label: 'Cats are better',
      teamLabel: 'Team cat',
      claim: 'Cats make better pets than dogs.',
      color: 'teal',
    },
    {
      id: 'dog',
      label: 'Dogs are better',
      teamLabel: 'Team dog',
      claim: 'Dogs make better pets than cats.',
      color: 'coral',
    },
  ],
  evidence: [
    {
      id: 'walk-schedule',
      object: 'Dog-walking schedule on the fridge',
      snippet:
        '“6:30 AM walk — rain or shine!” Three walks a day, and the whole family takes turns.',
      side: 'cat',
      strength: 'strong',
      type: 'fact',
      note: '3 walks a day, rain or shine',
      essaySentence:
        'Dogs need three walks a day, rain or shine, and the whole family has to take turns.',
    },
    {
      id: 'vet-pamphlet',
      object: 'Vet pamphlet on the counter',
      snippet: '“Average yearly care cost: cats about $300, dogs about $700.”',
      side: 'cat',
      strength: 'strong',
      type: 'statistic',
      note: 'Cats cost $300/yr, dogs $700',
      essaySentence:
        'A vet pamphlet shows cats cost about $300 a year to care for, while dogs cost about $700.',
    },
    {
      id: 'health-study',
      object: 'Magazine on the coffee table',
      snippet:
        '“Study: dog owners walk 22 more minutes per day — and their hearts show it.”',
      side: 'dog',
      strength: 'strong',
      type: 'statistic',
      note: 'Dog owners walk 22 min more',
      essaySentence:
        'A study found that dog owners walk 22 more minutes per day, which is better for their hearts.',
    },
    {
      id: 'scratched-sofa',
      object: 'Scratched-up sofa arm',
      snippet: 'Deep claw marks all down the arm. “Third sofa,” Mr. Henderson sighs.',
      side: 'dog',
      strength: 'medium',
      type: 'anecdote',
      note: 'Claw marks on the third sofa',
      essaySentence:
        'The family sofa is covered in claw marks — and it is already their third sofa.',
    },
    {
      id: 'chewed-shoe',
      object: 'Chewed sneaker by the door',
      snippet: 'One sneaker, chewed beyond rescue. The dog looks very pleased about it.',
      side: 'cat',
      strength: 'medium',
      type: 'anecdote',
      note: 'Sneaker chewed beyond rescue',
      essaySentence: 'By the door sits a sneaker the dog has chewed beyond rescue.',
    },
    {
      id: 'fire-clipping',
      object: 'Framed news clipping',
      snippet:
        '“Local dog wakes family during house fire.” Touching — but it is one story, about one dog.',
      side: 'dog',
      strength: 'medium',
      type: 'anecdote',
      note: 'Dog woke family in a fire',
      essaySentence:
        'A framed news story tells how a local dog woke its family during a house fire.',
      discussion:
        'Strength is debatable on purpose: emotionally strong, evidentially a single case.',
    },
    {
      id: 'purring-cat',
      object: 'Cat purring on the armchair',
      snippet:
        'The cat is purring on its favorite chair. A magazine nearby notes that purring can lower stress.',
      side: 'cat',
      strength: 'medium',
      type: 'fact',
      note: 'Purring lowers stress',
      essaySentence:
        'The family cat purrs away on its favorite chair, and researchers note that purring can lower stress.',
    },
    {
      id: 'hiding-cat',
      object: "Neighbor's note on the corkboard",
      snippet: '“Whenever guests visit, my cat vanishes under the bed for hours.”',
      side: 'dog',
      strength: 'medium',
      type: 'anecdote',
      note: 'Cat hides from guests',
      essaySentence:
        'A neighbor writes that her cat hides under the bed whenever guests visit.',
    },
    {
      id: 'training-receipt',
      object: 'Receipt pinned to the corkboard',
      snippet: '“Puppy training classes — $200, eight sessions.”',
      side: 'cat',
      strength: 'medium',
      type: 'fact',
      note: '$200 for training classes',
      essaySentence: 'A pinned receipt shows the family paid $200 for puppy training classes.',
    },
    {
      id: 'apartment-notice',
      object: 'Notice taped to the door',
      snippet: '“Building reminder: no dogs over 25 pounds allowed.”',
      side: 'cat',
      strength: 'medium',
      type: 'fact',
      note: 'No dogs over 25 lbs allowed',
      essaySentence: 'The building notice says no dogs over 25 pounds are allowed.',
    },
    {
      id: 'trick-trophy',
      object: 'Trophy on the shelf',
      snippet: '“Best trick — Maple Street Pet Fair.” The dog can roll over on command.',
      side: 'dog',
      strength: 'weak',
      type: 'anecdote',
      note: "'Best trick' trophy",
      essaySentence:
        "The dog once won a 'best trick' trophy at the neighborhood pet fair.",
    },
    {
      id: 'allergy-meds',
      object: 'Allergy medicine on the shelf',
      snippet:
        'A box of allergy tablets. Hmm — cat allergies are more common than dog allergies.',
      side: 'dog',
      strength: 'weak',
      type: 'fact',
      note: 'Allergy meds on the shelf',
      essaySentence:
        'There is allergy medicine on the shelf, and cat allergies are more common than dog allergies.',
      discussion: 'Requires an inference step; tests reasoning, not just matching.',
    },
    {
      id: 'goldfish',
      object: 'Goldfish bowl',
      snippet:
        'The goldfish swims in circles. It does not seem to have an opinion on cats or dogs.',
      side: 'neither',
      note: 'Goldfish bowl',
    },
    {
      id: 'tv-remote',
      object: 'TV remote between the cushions',
      snippet: 'Found it! It has nothing to say about pets, though.',
      side: 'neither',
      note: 'TV remote',
    },
  ],
}
