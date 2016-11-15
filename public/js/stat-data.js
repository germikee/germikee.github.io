var locations = [
	{
		title: 'Academia De Santa Monica',
		type: 'school',
		place_id: 'ChIJYRGzsLOeqTMRo6o_mfVXx7c',
		location: {
			lat: 10.3144748,
			lng: 123.88501819999999
		}
	},
	{
		title: 'Kids Daycare and after School Center',
		type: 'school',
		place_id: 'ChIJwSZyghecqTMRiBrMuhuaUbs',
		location: {
			lat: 10.3156992,
			lng: 123.88543670000001
		}
	},
	{
		title: 'Royal Oaks International School',
		type: 'school',
		place_id: 'ChIJ-WVaMbWeqTMRSqRPzVHJ_G8',
		location: {
			lat: 10.3164319,
			lng: 123.88539600000001
		}
	},
	{
		title: 'Dr. Emilio Osmena High School',
		type: 'school',
		place_id: 'ChIJjVXAJ7WeqTMR5Rn_hHIauVM',
		location: {
			lat: 10.3157,
			lng: 123.88499999999999
		}
	},
	{
		title: 'Cebu International Mark & James Academe Inc.',
		type: 'school',
		place_id: 'ChIJQSi0WLWeqTMRXx5B4nJX0VU',
		location: {
			lat: 10.317993,
			lng: 123.88474999999994
		}
	},

	{
		title: 'A Little Piece of Sky Cafe',
		type: 'restaurant',
		place_id: 'ChIJ03aOVLWeqTMRA98v719Z50E',
		location: {
			lat: 10.3177059,
			lng: 123.8856366
		}
	},
	{
		title: 'Yakski Barbecue',
		type: 'restaurant',
		place_id: 'ChIJEbO8SUqZqTMR1fL3iLAbLm4',
		location: {
			lat: 10.3152138,
			lng: 123.88990390000004
		}
	},
	{
		title: 'Harbour City Restaurant',
		type: 'restaurant',
		place_id: 'ChIJozQqKrWeqTMR9yrgFIrIpwE',
		location: {
			lat: 10.3156992,
			lng: 123.88543660000005
		}
	},
	{
		title: 'Kaona Grill',
		type: 'restaurant',
		place_id: 'ChIJozQqKrWeqTMRoACDyekHsyk',
		location: {
			lat: 10.3156992,
			lng: 123.88543660000005
		}
	},
	{
		title: 'Planet Vegis',
		type: 'restaurant',
		place_id: 'ChIJxVK2WzWZqTMRQzPHGKHdJHg',
		location: {
			lat: 10.318213,
			lng: 123.88667899999996
		}
	},
	{
		title: 'Chong Hua Hospital',
		type: 'hospital',
		place_id: 'ChIJVU9t1U2ZqTMRCT54fK83Hvc',
		location: {
			lat: 10.3099267,
			lng: 123.89117770000007
		}
	},
	{
		title: 'Perpetual Succour Hospital',
		type: 'hospital',
		place_id: 'ChIJE4rQCUeZqTMRNvQDEK_GkBU',
		location: {
			lat: 10.3149776,
			lng: 123.8994662
		}
	},
	{
		title: 'Vicente Sotto Memorial Medical Center',
		type: 'hospital',
		place_id: 'ChIJ40MeAk6ZqTMRbqk9ZVmqeoE',
		location: {
			lat: 10.307939,
			lng: 123.89161000000001
		}
	},
	{
		title: "Cebu Doctors' University Hospital",
		type: 'hospital',
		place_id: 'ChIJ55Q5ekmZqTMR7nLs2XqB7W0',
		location: {
			lat: 10.3146869,
			lng: 123.89186259999997
		}
	},
	{
		title: 'Cebu City Medical Center',
		type: 'hospital',
		place_id: 'ChIJLw054_2bqTMRNGCvQNZ-rsM',
		location: {
			lat: 10.2975238,
			lng: 123.89144959999999
		}
	},
	{
		title: "Rustan's Cebu",
		type: 'store',
		place_id: 'ChIJ15ozwz6ZqTMR8wsaIGrphlQ',
		location: {
			lat: 10.3169103,
			lng: 123.90576929999997
		}
	},
	{
		title: 'Cebu Appliance Center Main Branch (Downtown)',
		type: 'store',
		place_id: 'ChIJX-iNouKbqTMRYXVof8-QvqU',
		location: {
			lat: 10.2966952,
			lng: 123.89815520000002
		}
	},
	{
		title: 'Dell Concept Store',
		type: 'store',
		place_id: 'ChIJO329Y22ZqTMR_4VxHAIRe64',
		location: {
			lat: 10.312391,
			lng: 123.91898400000002
		}
	},
	{
		title: "ACDC Component Part Sales",
		type: 'store',
		place_id: 'ChIJR2BGVcWYqTMRdztrWgzrdkA',
		location: {
			lat: 10.2957869,
			lng: 123.89973800000007
		}
	},
	{
		title: 'Vans Store',
		type: 'store',
		place_id: 'ChIJixliHT-ZqTMRwwKfJFtj01c',
		location: {
			lat: 10.318128,
			lng: 123.904492
		}
	},
	{
		title: 'Basilica Minore del Santo Nino',
		type: 'church',
		place_id: 'ChIJp45-1uObqTMRKiyk55UEjGY',
		location: {
			lat: 10.2943282,
			lng: 123.9021295
		}
	},
	{
		title: 'The Church of Jesus Christ of Latter-day Saints',
		type: 'church',
		place_id: 'ChIJWxN4FSWZqTMR8KfwccwAEzg',
		location: {
			lat: 10.3276279,
			lng: 123.89822500000002
		}
	},
	{
		title: 'Redemptorist Church',
		type: 'church',
		place_id: 'ChIJxZmjGUaZqTMRR5u5Tob6zGI',
		location: {
			lat: 10.3128498,
			lng: 123.89754300000004
		}
	},
	{
		title: 'Archdiocesan Shrine of Our Lady of Lourdes',
		type: 'church',
		place_id: 'ChIJBdMP0hucqTMRLk-E6I6Sl04',
		location: {
			lat: 10.293396,
			lng: 123.86980900000003
		}
	},
	{
		title: 'Our Lady of the Sacred Heart Parish',
		type: 'church',
		place_id: 'ChIJ69rb5DeZqTMRfNGBX2itk9U',
		location: {
			lat: 10.3172892,
			lng: 123.8961329
		}
	}
]

var placeses = [
	["harley", "10.3144748", "123.88501819999999"],
	["Kids Daycare and after School Center", "10.3156992", "123.88501819999999"]
]