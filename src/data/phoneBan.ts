import type { CaseData } from '../types'

export const phoneBan: CaseData = {
  id: 'phone-ban',
  caseNo: 'Case 002',
  title: 'The phone ban',
  prompt: 'Should schools ban cell phones during the school day?',
  briefing:
    'Maple Middle School votes next week on banning cell phones during the school day. Both sides insist the evidence is on their side. Your agency has been called in: search the classroom and the hallway, weigh every clue, and build the case the school board should hear.',
  sides: [
    {
      id: 'ban',
      label: 'Phones should be banned',
      teamLabel: 'Ban phones',
      claim: 'Schools should ban cell phones during the school day.',
      color: 'coral',
    },
    {
      id: 'allow',
      label: 'Phones should be allowed',
      teamLabel: 'Allow phones',
      claim: 'Schools should not ban cell phones during the school day.',
      color: 'teal',
    },
  ],
  evidence: [
    {
      id: 'study',
      object: 'Printout taped by the blackboard',
      snippet:
        '“Across 91 schools, test scores rose 6.4% after phone bans — struggling students gained the most.”',
      side: 'ban',
      strength: 'strong',
      type: 'statistic',
      note: 'Scores rose 6.4% after bans',
      essaySentence:
        'In a study of 91 schools, test scores rose 6.4 percent after phones were banned, and struggling students gained the most.',
    },
    {
      id: 'refocus',
      object: "Article in the teacher's binder",
      snippet: '“It takes about 20 minutes to fully refocus after a single notification.”',
      side: 'ban',
      strength: 'strong',
      type: 'expert',
      note: '20 min to refocus',
      essaySentence:
        'Researchers find it takes about 20 minutes to fully refocus after a single notification.',
    },
    {
      id: 'tally',
      object: "Tally sheet on the teacher's desk",
      snippet: '“Phone reminders given this week: 27.” One class, one week.',
      side: 'ban',
      strength: 'medium',
      type: 'fact',
      note: '27 phone reminders in a week',
      essaySentence: 'One teacher had to give 27 phone reminders in a single week.',
    },
    {
      id: 'chat',
      object: 'Note taped on the classroom wall',
      snippet:
        '"Students checked their phones 47 times on average during yesterday\'s lesson." — Ms. Park tracked her own class for a day.',
      side: 'ban',
      strength: 'medium',
      type: 'statistic',
      note: '47 phone checks in one lesson',
      essaySentence:
        'Ms. Park tracked her class for a day and found students checked their phones an average of 47 times during a single lesson.',
    },
    {
      id: 'lunch',
      object: 'Clipping on the bulletin board',
      snippet:
        '“After our locked-pouch policy, the cafeteria got louder — in a good way,” one school reports.',
      side: 'ban',
      strength: 'medium',
      type: 'anecdote',
      note: 'Friendlier cafeteria after pouches',
      essaySentence:
        'A school that adopted a locked-pouch policy reported a louder, friendlier cafeteria.',
    },
    {
      id: 'cracked',
      object: 'Cracked phone on the hallway floor',
      snippet:
        'Two students are arguing about whose fault it was. It happened during passing period.',
      side: 'ban',
      strength: 'weak',
      type: 'anecdote',
      note: 'Cracked phone argument',
      essaySentence:
        'A cracked phone on the hallway floor sparked an argument between two students.',
    },
    {
      id: 'alert',
      object: 'Safety poster on the lockers',
      snippet: '“District safety alerts are sent straight to student phones.”',
      side: 'allow',
      strength: 'strong',
      type: 'fact',
      note: 'Safety alerts go to phones',
      essaySentence: "The district sends safety alerts straight to students' phones.",
    },
    {
      id: 'laptops',
      object: 'Sign on the hallway wall',
      snippet: '“Only 12 laptops for 30 students — please use your own device for research.”',
      side: 'allow',
      strength: 'strong',
      type: 'fact',
      note: '12 laptops for 30 students',
      essaySentence:
        "The library has only 12 laptops for 30 students, so many lessons depend on students' own devices.",
    },
    {
      id: 'survey',
      object: 'PTA clipboard on the bench',
      snippet:
        '“68% of parents say they want to reach their child directly during the school day.”',
      side: 'allow',
      strength: 'medium',
      type: 'statistic',
      note: '68% of parents want direct contact',
      essaySentence:
        'A parent survey found 68 percent of parents want to reach their child directly during the day.',
    },
    {
      id: 'translate',
      object: 'Phone on a student desk',
      snippet:
        'A translation app is open — a new student has been following the lesson with it.',
      side: 'allow',
      strength: 'medium',
      type: 'anecdote',
      note: 'New student uses translation app',
      essaySentence:
        'A new student followed the lesson using a translation app on her phone.',
    },
    {
      id: 'glucose',
      object: 'Backpack with a phone poking out',
      snippet:
        'The screen shows a glucose-monitor app. Its owner manages her diabetes with it. Strong for her — but does one case set policy?',
      side: 'allow',
      strength: 'medium',
      type: 'fact',
      note: 'Glucose-monitor app',
      essaySentence:
        'One student manages her diabetes through a glucose-monitor app on her phone.',
      discussion:
        'Deliberately debatable: vital for one student — does that decide a school-wide rule?',
    },
    {
      id: 'detention',
      object: 'Memo on the bulletin board',
      snippet:
        '“Phone detentions have doubled since the ban began.” Does this prove phones are a problem — or that bans don\'t work?',
      side: 'allow',
      strength: 'weak',
      type: 'fact',
      note: 'Detentions doubled since ban',
      essaySentence: 'An office memo says phone detentions have doubled since the ban began.',
      discussion: 'Ambiguous by design — sparks the best classroom debates.',
    },
    {
      id: 'vending',
      object: 'Vending machine',
      snippet: 'It hums quietly by the wall. Tasty, but is it about phones?',
      side: 'neither',
      note: 'Vending machine',
    },
    {
      id: 'scarf',
      object: 'Lost scarf on the bench',
      snippet: "Someone lost a scarf. It's tagged for lost-and-found.",
      side: 'neither',
      note: 'Lost scarf',
    },
  ],
}
