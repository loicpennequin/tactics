export default {
    ownTeam: [
        {
            name: 'Sona',
            portraitUrl:
                'https://www.mobafire.com/images/avatars/sona-classic.png',
            splashUrl:
                'https://vignette.wikia.nocookie.net/leagueoflegends/images/3/39/Sona_OriginalLoading.jpg',
            baseStats: {
                hp: 200,
                mp: 300,
                speed: 7
            },
            hp: 60,
            mp: 140,
            speed: 7,
            skills: [
                {
                    name: 'Hymn of Valor',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/sona-hymn-of-valor.png',
                    description:
                        'Active: Sona sends out bolts of sound that deal 40 / 70 / 100 / 130 / 160 (+60% of ability power) magic damage to the two nearest enemies within 700-range, prioritizing champions.'
                },
                {
                    name: 'Aria of Perseverence',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/sona-aria-of-perseverance.png',
                    description:
                        'Active: Sona heals herself and a nearby allied champion for 30 / 50 / 70 / 90 / 110 (+25% of ability power).'
                },
                {
                    name: 'Song of Celerity',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/sona-song-of-celerity.png',
                    description:
                        'Active: Sona gains 10 / 11 / 12 / 13 / 14% (+8% per 100 ability power) movement speed for 3 seconds. The buff lasts for an additional 4 seconds while Sona is out of combat.'
                },
                {
                    name: 'Crescendo',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/sona-crescendo.png',
                    description:
                        'Active: Sona plays her ultimate chord, forcing enemy champions to dance (stun) for 1.5 seconds and take 150 / 250 / 350 (+50% of ability power) magic damage.'
                }
            ],
            ongoingStatus: [
                {
                    type: 'POSITIVE',
                    from: 'Hymn of Valor',
                    effect: {
                        description:
                            'This unit will deal bonus magic damage on their next attack.',
                        icon: 'ra-burning-meteor'
                    }
                },
                {
                    type: 'NEGATIVE',
                    from: 'Deadly Venom',
                    effect: {
                        description: 'This unit will lose some HP each round',
                        icon: 'ra-skull'
                    }
                },
                {
                    type: 'NEGATIVE',
                    from: 'Charm',
                    effect: {
                        description:
                            'This unit is infatuated and cannot attack or use a spell against their loved one.',
                        icon: 'ra-two-hearts'
                    }
                }
            ]
        },

        {
            name: 'Ashe',
            portraitUrl:
                'https://www.mobafire.com/images/avatars/ashe-classic.png',
            splashUrl:
                'https://vignette.wikia.nocookie.net/leagueoflegends/images/c/c1/Ashe_OriginalLoading.jpg',
            baseStats: {
                hp: 180,
                mp: 160,
                speed: 6
            },
            hp: 150,
            mp: 100,
            speed: 6,
            skills: [
                {
                    name: 'Frost Shot',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/ashe-frost-shot.png',
                    description:
                        'Ashes basic attacks and damaging abilities apply Frost, slowing targets by 15-30% (at levels 1-18, increasing every 3 levels) for 2 seconds and causing subsequent basic attacks against them to deal 10 (+ critical strike chance × (1 + bonus critical damage))% bonus physical damage while they remain slowed.'
                },
                {
                    name: 'Volley',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/ashe-volley.png',
                    description:
                        'Ashe fires 9 arrows in a cone, dealing 20 / 35 / 50 / 65 / 80 (+1.0 per attack damage) physical damage to each target hit. Enemies can be hit by multiple arrows, but will only take damage from the first one. Volley automatically critically strikes against enemy champions, applying a slow equal to double the current value of Frost Shot.'
                },
                {
                    name: "Ranger's Focus",
                    imageUrl:
                        'https://www.mobafire.com/images/ability/sona-song-of-celerity.png',
                    description:
                        "Ashe's basic attacks grant Focus, stacking up to 4 times. Stacks last for 4 seconds, after which they fall off one at a time every second."
                },
                {
                    name: 'Enchanted Crystal Arrow',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/ashe-enchanted-crystal-arrow.png',
                    description:
                        'Ashe fires a missile of ice in a straight line that will pass over all other units until it collides with an enemy Champion or leaves the map. If the arrow collides with an enemy Champion, it will deal 200 / 400 / 600 (+100% of ability power) magic damage, stun and add a slow to the champion hit.'
                }
            ],
            ongoingStatus: [
                {
                    type: 'POSITIVE',
                    from: 'FROST SHOT',
                    effect: {
                        description:
                            'Pshysical damage dealt by this unit will slow the target.',
                        icon: 'ra-frozen-arrow'
                    }
                },
                {
                    type: 'NEGATIVE',
                    from: 'Deadly Venom',
                    effect: {
                        description: 'This unit will lose some HP each round',
                        icon: 'ra-skull'
                    }
                }
            ]
        },

        {
            name: 'Xin Zhao',
            portraitUrl:
                'https://www.mobafire.com/images/avatars/xin-zhao-classic.png',
            splashUrl:
                'https://vignette.wikia.nocookie.net/leagueoflegends/images/2/2e/Xin_Zhao_OriginalLoading.jpg',
            baseStats: {
                hp: 280,
                mp: 150,
                speed: 2
            },
            hp: 200,
            mp: 40,
            speed: 5,
            skills: [
                {
                    name: 'Three Talon Strike',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/xin-zhao-three-talon-strike.png',
                    description:
                        'Xin Zhao prepares to unleash a fearsome combo, causing his next 3 standard attacks to deal his attack damage + 20 / 25 / 30 / 35 / 40 (+ 40% bonus AD) to enemy targets, with the final attack knocking his opponent into the air.'
                },
                {
                    name: 'Wind Becomes Lightning',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/xin-zhao-wind-becomes-lightning.png',
                    description:
                        'Xin Zhao performs two swift strikes over a 0.5-0.4 second period (based on bonus attack speed), the first dealing 30 / 40 / 50 / 60 / 70 (+ 30% AD) physical damage to all enemies in an arc and the second dealing 40 / 75 / 110 / 145 / 180 (+ 75% AD) damage and slowing all enemies in a line by 50% for 1.5 seconds.'
                },
                {
                    name: 'Audacious Charge',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/xin-zhao-audacious-charge.png',
                    description:
                        'Xin Zhao charges and challenges an enemy. The charge deals 50 / 75 / 100 / 125 / 150 (+60% of ability power) magic damage to all nearby enemies and slows them for 30% for 0.5 seconds.'
                },
                {
                    name: 'Crescent Guard',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/xin-zhao-crescent-guard.png',
                    description:
                        "Active: Xin Zhao sweeps around him, dealing 75 / 150 / 225 (+ 100% bonus AD) (+ 15% of target's current health) physical damage to enemies hit, capped at 600 (+ 100% bonus AD) against monsters. Non-Challenged enemies are also knocked back and stunned for 0.75 seconds."
                }
            ],
            ongoingStatus: []
        }
    ],

    enemyTeam: [
        {
            name: 'Kennen',
            portraitUrl:
                'https://www.mobafire.com/images/avatars/kennen-classic.png',
            splashUrl:
                'https://vignette.wikia.nocookie.net/leagueoflegends/images/7/75/Kennen_OriginalLoading.jpg',
            baseStats: {
                hp: 150,
                mp: 210,
                speed: 8
            },
            hp: 70,
            mp: 140,
            speed: 8,
            skills: [
                {
                    name: 'Thundering Shuriken',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/kennen-thundering-shuriken.png',
                    description:
                        'Kennen throws a fast moving shuriken towards a location, dealing 75 / 115 / 155 / 195 / 235 (+75% of ability power) magic damage and adding a Mark of the Storm to any opponent that it hits.'
                },
                {
                    name: 'Electrical Surge',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/kennen-electrical-surge.png',
                    description:
                        'Surges electricity through all nearby targets afflicted by Mark of the Storm and all enemies caught in Slicing Maelstrom, dealing 60 / 85 / 110 / 135 / 160 (+80% of ability power) magic damage and adding another mark.'
                },
                {
                    name: 'Lightning Rush',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/kennen-lightning-rush.png',
                    description:
                        'Kennen transforms into a ball of electricity, disarming himself but becoming ghosted and gaining 100% bonus movement speed for 2 seconds.'
                },
                {
                    name: 'Slicing Maelstrom',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/kennen-slicing-maelstrom.png',
                    description:
                        'Kennen summons a magical storm around himself for 3 seconds, gaining 20 / 40 / 60 bonus armor and magic resistance and dealing 40 / 75 / 110 (+20% of ability power) magic damage to all enemies within range every 0.5 seconds.'
                }
            ],
            ongoingStatus: [
                {
                    type: 'NEGATIVE',
                    from: 'Crescendo',
                    effect: {
                        description:
                            'This unit is stunned and cannot attack or use an ability.',
                        icon: 'ra-lightning-bolt'
                    }
                }
            ]
        },

        {
            name: 'Ahri',
            portraitUrl:
                'https://www.mobafire.com/images/avatars/ahri-classic.png',
            splashUrl:
                'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e5/Ahri_OriginalLoading.jpg',
            baseStats: {
                hp: 200,
                mp: 260,
                speed: 7
            },
            hp: 150,
            mp: 100,
            speed: 7,
            skills: [
                {
                    name: 'Orb of Deception',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/ahri-orb-of-deception.png',
                    description:
                        'Kennen summons a magical storm around himself for 3 seconds, gaining 20 / 40 / 60 bonus armor and magic resistance and dealing 40 / 75 / 110 (+20% of ability power) magic damage to all enemies within range every 0.5 seconds.'
                },
                {
                    name: 'Fox-fire',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/ahri-fox-fire.png',
                    description:
                        'Ahri releases three fox-fires, which after a short delay lock on and attack nearby enemies (prioritizes champions), dealing 40 / 65 / 90 / 115 / 140 (+30% of ability power) magic damage. Additional fox-fires that hit the same target deal 30% damage, up to a maximum total damage of 64 / 104 / 144 / 184 / 224 (+48% of ability power).'
                },
                {
                    name: 'Charm',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/ahri-charm.png',
                    description:
                        'Ahri blows a kiss that deals 60 / 90 / 120 / 150 / 180 (+40% of ability power) magic damage to an enemy and charms it, interrupting in-progress dashes and causing them to walk harmlessly towards her for 1.4 / 1.55 / 1.7 / 1.85 / 2 seconds.'
                },
                {
                    name: 'Spirit Rush',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/ahri-spirit-rush.png',
                    description:
                        'Ahri dashes forward and fires essence bolts, damaging 3 nearby enemies (prioritizes champions) for 60 / 90 / 120 (+35% of ability power) magic damage per bolt. Spirit Rush can be cast up to three times within ten seconds before going on cooldown. Maximum total magic damage to a single target is 210 / 330 / 450 (+75% of ability power).'
                }
            ],
            ongoingStatus: [
                {
                    type: 'POSITIVE',
                    from: 'Fox-fire',
                    effect: {
                        description:
                            'The next hero who attacks this unit recieves damage',
                        icon: 'ra-burning-meteor'
                    }
                },
                {
                    type: 'NEGATIVE',
                    from: 'Crescendo',
                    effect: {
                        description:
                            'This unit is stunned and cannot attack or use an ability.',
                        icon: 'ra-lightning-bolt'
                    }
                }
            ]
        },

        {
            name: 'Twitch',
            portraitUrl:
                'https://www.mobafire.com/images/avatars/twitch-classic.png',
            splashUrl:
                'https://vignette.wikia.nocookie.net/leagueoflegends/images/2/2d/Twitch_OriginalLoading.jpg',
            baseStats: {
                hp: 180,
                mp: 160,
                speed: 6
            },
            hp: 20,
            mp: 110,
            speed: 6,
            skills: [
                {
                    name: 'Ambush',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/twitch-ambush.png',
                    description:
                        'After 1 second, Twitch becomes camouflaged for 10 / 11 / 12 / 13 / 14 seconds. While stealthed, Twitch gains 10% movement speed, tripled when moving towards an enemy champion within 1000 range who cannot see him.'
                },
                {
                    name: 'Deadly Venom',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/twitch-deadly-venom.png',
                    description:
                        "Twitch's basic attacks infect the target, dealing 1 / 2 / 3 / 4 / 5 true damage every second for 6 seconds, stacking up to 6 times. The amount is increased every 4 levels."
                },
                {
                    name: 'Contaminate',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/twitch-contaminate.png',
                    description:
                        'Deals 20 / 30 / 40 / 50 / 60 physical damage to enemies infected with Deadly Venom. Expunge deals an additional 15 / 20 / 25 / 30 / 35 (+20% of ability power) (+0.35 per bonus attack damage) physical damage per stack of Deadly Venom on them.'
                },
                {
                    name: 'Spray and Pray',
                    imageUrl:
                        'https://www.mobafire.com/images/ability/twitch-spray-and-pray.png',
                    description:
                        'For 5 seconds, Twitch gains 300 attack range, 20 / 30 / 40 bonus attack damage, and his basic attacks pierce through his attack targets, traveling all the way to his maximum attack range. The piercing bolts deal 20% less damage to each subsequent target, down to a minimum of 40% damage.'
                }
            ],
            ongoingStatus: [
                {
                    type: 'NEGATIVE',
                    from: 'Crescendo',
                    effect: {
                        description:
                            'This unit is stunned and cannot attack or use an ability.',
                        icon: 'ra-lightning-bolt'
                    }
                }
            ]
        }
    ]
};
