/**
 * Demo data. Everything here is fictional and unrelated to any real itinerary.
 * In the production app this data is served from a cloud database.
 *
 * The demo deliberately keeps only: 2 destinations (1 available + 1 coming soon),
 * 3 stops per itinerary, and two fields per stop (title + location).
 */

const DESTINATIONS = [
  { id: 'hongkong', name: 'Hong Kong', flags: ['🇭🇰'], available: true },
  { id: 'uk', name: 'United Kingdom', flags: ['🇬🇧'], available: false }
]

/** One demo itinerary per available destination; days[].stops[] carry only title and location */
const ITINERARIES = {
  hongkong: {
    name: 'Hong Kong',
    anchor: '2027-04-10',
    days: [
      {
        day: 1,
        label: 'Sample route · Day 1',
        stops: [
          { title: 'Sample Stop 1', location: 'Sample Area A' },
          { title: 'Sample Stop 2', location: 'Sample Area B' }
        ]
      },
      {
        day: 2,
        label: 'Sample route · Day 2',
        stops: [
          { title: 'Sample Stop 3', location: 'Sample Area C' }
        ]
      }
    ]
  }
}

module.exports = { DESTINATIONS, ITINERARIES }
