# Cannabis Manager - Game Design Document

## 1. EXECUTIVE SUMMARY

**Genre**: Idle/Clicker + Manager/Tycoon
**Platform**: Web (Desktop & Mobile)
**Target Audience**: 18+ (Cannabis Theme)
**Session Length**: 2-10 minutes (idle-friendly)
**Inspirations**: Cookie Clicker, AdVenture Capitalist, Weed Inc., Clash Royale (quality polish)

**Core Concept**: Build your cannabis empire from a single plant in your bedroom to a massive legal operation. Plant seeds, harvest buds, manage risk, upgrade your operation, hire staff, and progress through increasingly sophisticated growing setups while avoiding police raids.

---

## 2. CORE GAME LOOP

### 2.1 Primary Loop (Every 5-30 seconds)
```
PLANT SEED → WAIT (Growth Time) → HARVEST → SELL → EARN MONEY → BUY UPGRADES → REPEAT
```

### 2.2 Detailed Mechanics

#### Planting
- **Action**: Click "Plant Seed" button or auto-plant if unlocked
- **Cost**: Seeds cost money (starts at $10, scales with strain quality)
- **Capacity**: Limited by grow slots (start with 1, expand to 1000+)
- **Animation**: 0.3s seed planting animation

#### Growing
- **Real-time**: Plants grow in real-time (continues while offline)
- **Visual Stages**: 4 growth stages (Seed → Sprout → Vegetative → Flowering)
- **Growth Times**:
  - **Tier 1 (Basic)**: 30 seconds
  - **Tier 2 (Mid)**: 60 seconds
  - **Tier 3 (Advanced)**: 120 seconds
  - **Tier 4 (Premium)**: 240 seconds
  - **Tier 5 (Elite)**: 480 seconds (8 minutes)
- **Growth Speed Modifiers**: Equipment, upgrades, workers reduce time
- **Risk Accumulation**: Heat increases slowly while plants are growing

#### Harvesting
- **Manual Click**: Click mature plant to harvest (generates 1-10 buds depending on strain)
- **Auto-Harvest**: Unlocked via upgrades, harvests automatically when ready
- **Batch Harvest**: "Harvest All" button unlocked at Level 5
- **Yield Calculation**:
  ```
  Yield = Base_Yield × (1 + Equipment_Bonus) × (1 + Worker_Bonus) × Quality_Multiplier
  ```

#### Selling
- **Auto-Sell**: All harvested buds convert to money instantly
- **Price Per Bud**: Varies by strain quality ($1 - $500 per bud)
- **Bulk Bonus**: Sell 100+ buds at once = +5% bonus
- **Market Events**: Random 2x price events (5% chance every 5 minutes)

### 2.3 Click vs Idle Balance

**Active Play (Clicking)**:
- +20% faster harvest (clicking plants speeds growth by 0.5s per click)
- Manual mini-games for bonus rewards
- Instant collect of idle earnings with +10% bonus

**Idle Play (Passive)**:
- Auto-planters work 24/7
- Offline earnings calculated (up to 8 hours, extendable)
- Offline earnings = 60% of active earnings rate

**Hybrid Optimal**: Check in every 2-5 minutes, collect idle earnings, make upgrade decisions

---

## 3. RESOURCES & CURRENCIES

### 3.1 Primary Currency: Cash ($)

**Starting Amount**: $100
**Initial Earning Rate**: $2-5 per harvest cycle (30s)
**Scaling**: Exponential (doubles roughly every 30 minutes of progress)

**Cash Sources**:
- Selling harvested buds (99% of income)
- Quest rewards (small amounts)
- Achievement rewards
- Watching ads (optional): $100 × current_stage

### 3.2 Premium Currency: Green Coins (GC)

**Starting Amount**: 50 GC (tutorial reward)
**No Real Money**: Earned through gameplay only

**Green Coin Sources**:
- Level Up: 10 GC per level (1-50), 25 GC per level (51-100)
- Achievements: 5-100 GC depending on difficulty
- Daily Login: 5 GC (20 GC on day 7)
- Daily Quests: 3-10 GC each
- Prestige Bonus: 100 GC per prestige
- Lucky Events: Random 5-25 GC drops (1% chance on harvest)

**Green Coin Uses**:
- Speed Boosts (50 GC = 2x speed for 10 minutes)
- Instant Build (cost = time_remaining_in_seconds)
- Double Offline Earnings (100 GC)
- Extra Grow Slots (50 GC per slot, max 10 bonus slots)
- Cosmetic Skins (100-500 GC)

### 3.3 Cannabis Strains (12 Types)

| Tier | Strain Name | Growth Time | Yield (buds) | Price/Bud | Unlock Req | Quality |
|------|-------------|-------------|--------------|-----------|------------|---------|
| 1 | Schwag Weed | 30s | 1 | $1 | Start | ★☆☆☆☆ |
| 1 | Backyard Green | 40s | 2 | $2 | Level 3 | ★☆☆☆☆ |
| 2 | Northern Lights | 60s | 3 | $8 | Level 8 | ★★☆☆☆ |
| 2 | Blue Dream | 75s | 4 | $12 | Level 12 | ★★☆☆☆ |
| 3 | OG Kush | 120s | 6 | $35 | Level 20 | ★★★☆☆ |
| 3 | Sour Diesel | 150s | 8 | $50 | Level 28 | ★★★☆☆ |
| 4 | Girl Scout Cookies | 240s | 12 | $140 | Level 40 | ★★★★☆ |
| 4 | Wedding Cake | 300s | 15 | $200 | Level 50 | ★★★★☆ |
| 5 | Godfather OG | 480s | 25 | $500 | Level 65 | ★★★★★ |
| 5 | Gorilla Glue #4 | 540s | 30 | $600 | Level 75 | ★★★★★ |
| 5 | Purple Haze | 600s | 40 | $750 | Level 85 | ★★★★★ |
| 5 | Unicorn Tears | 720s | 60 | $1000 | Level 95 | ★★★★★ |

**Strain Stats**:
- **THC %**: Cosmetic stat (15-35%)
- **CBD %**: Cosmetic stat (0.5-15%)
- **Difficulty**: Higher tier = more heat generated
- **Special Traits**: Some strains have bonuses (e.g., Blue Dream = -10% heat)

### 3.4 Secondary Resources

**Seeds**:
- Auto-purchased when planting (deducted from cash)
- Seed cost = 10% of bud sell value

**Water/Nutrients**:
- Abstract resource (represented by upgrades, not tracked separately)

**Heat/Attention**:
- Risk meter (0-100%)
- See section 6 for details

---

## 4. UPGRADE SYSTEM

### 4.1 Upgrade Categories

1. **Equipment** (Growing Tech)
2. **Buildings** (Expand Space)
3. **Workers** (Automation)
4. **Security** (Risk Management)
5. **Research** (Unlock Features)
6. **Business** (Income Multipliers)

### 4.2 Equipment Upgrades (Growing Tech)

| ID | Name | Effect | Base Cost | Cost Scaling | Max Level | Unlock |
|----|------|--------|-----------|--------------|-----------|--------|
| E1 | Basic LED Lights | -5% grow time | $500 | 1.15^n | 25 | Start |
| E2 | Grow Tent | +10% yield | $1,200 | 1.15^n | 25 | Level 5 |
| E3 | Carbon Filter | -8% heat gain | $3,000 | 1.18^n | 20 | Level 8 |
| E4 | Hydroponic System | +20% yield | $15,000 | 1.2^n | 15 | Level 15 |
| E5 | Climate Controller | -12% grow time | $50,000 | 1.2^n | 15 | Level 22 |
| E6 | Advanced Nutrients | +30% yield | $250,000 | 1.22^n | 12 | Level 30 |
| E7 | CO2 Generator | -15% grow time | $1M | 1.25^n | 10 | Level 38 |
| E8 | UV Sterilizer | +15% quality | $5M | 1.25^n | 10 | Level 45 |
| E9 | Automated Trimmer | Instant harvest | $25M | 1.28^n | 8 | Level 52 |
| E10 | Genetic Optimizer | +50% yield | $100M | 1.3^n | 5 | Level 60 |

### 4.3 Building Upgrades (Expand Space)

| ID | Name | Grow Slots | Cost | Heat Cap | Unlock |
|----|------|------------|------|----------|--------|
| B1 | Bedroom Closet | 1 → 3 | $0 (start) | +0% | Start |
| B2 | Spare Room | 3 → 8 | $5,000 | +20% | Level 6 |
| B3 | Basement Setup | 8 → 20 | $50,000 | +50% | Level 14 |
| B4 | Garage Conversion | 20 → 50 | $500,000 | +80% | Level 25 |
| B5 | Backyard Shed | 50 → 100 | $5M | +100% | Level 35 |
| B6 | Small Warehouse | 100 → 250 | $50M | +150% | Level 48 |
| B7 | Industrial Unit | 250 → 500 | $500M | +200% | Level 60 |
| B8 | Licensed Facility | 500 → 1000 | $5B | +300% | Level 75 |
| B9 | Corporate Farm | 1000 → 2500 | $50B | +500% | Level 90 |

**Building Features**:
- Each building upgrade increases max heat capacity (survive longer before raids)
- Visual change on main screen
- Unlocks new worker types

### 4.4 Worker Upgrades (Automation)

| ID | Name | Effect | Cost/Worker | Max Workers | Unlock |
|----|------|--------|-------------|-------------|--------|
| W1 | Friend Helper | Plants 1 seed/5s | $2,000 | 3 | Level 10 |
| W2 | Part-Time Grower | Harvests 1 plant/5s | $10,000 | 5 | Level 16 |
| W3 | Trimmer | +5% yield per worker | $50,000 | 8 | Level 24 |
| W4 | Security Guard | -3% heat per worker | $150,000 | 6 | Level 32 |
| W5 | Master Grower | -10% grow time | $1M | 4 | Level 42 |
| W6 | Chemist | +10% quality | $8M | 3 | Level 54 |
| W7 | Salesperson | +15% income | $50M | 5 | Level 64 |
| W8 | Lawyer | Reduces raid loss -20% | $200M | 2 | Level 72 |
| W9 | Lobbyist | Heat gain -50% | $1B | 1 | Level 82 |

**Worker Mechanics**:
- Workers cost salary per worker (paid once, permanent)
- Stack multiplicatively
- Can be upgraded (Level 1-10, +10% effectiveness per level)

### 4.5 Security Upgrades (Risk Management)

| ID | Name | Effect | Cost | Max Level |
|----|------|--------|------|-----------|
| S1 | Door Locks | -5% raid chance | $800 | 10 |
| S2 | Window Tint | -3% heat gain | $3,000 | 15 |
| S3 | Smell Proof Walls | -8% heat gain | $15,000 | 12 |
| S4 | Security Cameras | +20% raid warning time | $80,000 | 8 |
| S5 | Lawyer on Retainer | -25% raid loss | $500,000 | 5 |
| S6 | Police Scanner | +2% raid warning time | $2M | 10 |
| S7 | Encrypted Comms | -15% heat gain | $15M | 6 |
| S8 | License & Permits | -50% raid chance | $100M | 3 |

### 4.6 Research Upgrades (Unlock Features)

| ID | Name | Effect | Cost | Unlock |
|----|------|--------|------|--------|
| R1 | Auto-Planting | Plants seeds automatically | $5,000 | Level 7 |
| R2 | Auto-Harvesting | Harvests mature plants | $25,000 | Level 12 |
| R3 | Batch Operations | "Plant All" & "Harvest All" | $100,000 | Level 18 |
| R4 | Quality Breeding | Unlock higher tier strains | $500,000 | Level 26 |
| R5 | Marketing Network | +25% sell price | $3M | Level 36 |
| R6 | Distribution Chain | Double offline earnings time | $20M | Level 46 |
| R7 | International Export | +100% income | $150M | Level 58 |
| R8 | Genetic Engineering | Custom strains | $1B | Level 70 |

### 4.7 Business Upgrades (Income Multipliers)

| ID | Name | Effect | Cost | Cost Scaling |
|----|------|--------|------|--------------|
| BU1 | Street Reputation | +5% income | $1,000 | 1.12^n |
| BU2 | Packaging Upgrade | +8% income | $10,000 | 1.15^n |
| BU3 | Brand Recognition | +12% income | $100,000 | 1.18^n |
| BU4 | Premium Clientele | +20% income | $1M | 1.2^n |
| BU5 | Dispensary Partnership | +35% income | $10M | 1.22^n |
| BU6 | Medical License | +50% income | $100M | 1.25^n |

### 4.8 Upgrade Tree Dependencies

```
Basic LED Lights → Climate Controller → CO2 Generator
       ↓
  Grow Tent → Hydroponic System → Genetic Optimizer
                                          ↓
                                  Genetic Engineering

Auto-Planting → Auto-Harvesting → Automated Trimmer

Door Locks → Security Cameras → License & Permits
```

---

## 5. BUILDINGS & PROGRESSION

### 5.1 Location Progression

| Stage | Location | Slots | Cost | Monthly Rent | Features | Unlock |
|-------|----------|-------|------|--------------|----------|--------|
| 1 | Bedroom Closet | 1-3 | Free | $0 | Tutorial area | Start |
| 2 | Spare Room | 3-8 | $5,000 | $0 | Basic setup | Level 6 |
| 3 | Basement | 8-20 | $50,000 | $0 | Discrete location | Level 14 |
| 4 | Garage | 20-50 | $500,000 | $100/day | Vehicle cover | Level 25 |
| 5 | Backyard Shed | 50-100 | $5M | $500/day | Outdoor access | Level 35 |
| 6 | Warehouse | 100-250 | $50M | $2,000/day | Commercial scale | Level 48 |
| 7 | Industrial Unit | 250-500 | $500M | $10,000/day | Legitimate business | Level 60 |
| 8 | Licensed Facility | 500-1000 | $5B | $50,000/day | Legal operation | Level 75 |
| 9 | Corporate Farm | 1000-2500 | $50B | $0 (owned) | End-game empire | Level 90 |

### 5.2 Building Features

**Bedroom Closet** (Starter):
- 1 grow slot (upgradeable to 3)
- High heat risk (+100% heat gain)
- No workers allowed
- Free forever

**Spare Room**:
- Unlocks: Door Locks, Window Tint
- Can hire 1 Friend Helper
- -10% heat gain vs Closet

**Basement**:
- Unlocks: Carbon Filter, Smell Proof Walls
- Can hire 3 workers
- -30% heat gain vs Closet
- Hidden location bonus: +50% heat capacity

**Garage**:
- Unlocks: Security Cameras
- Can hire 6 workers
- Vehicle escape mechanic (15% chance to avoid raids)

**Backyard Shed**:
- Sunlight bonus: -10% grow time on Tier 1-2 strains
- Can hire 10 workers
- Neighbors start complaining (random events)

**Warehouse**:
- Unlocks: Professional equipment
- Can hire 20 workers
- Business license required (one-time $5M fee)

**Industrial Unit**:
- Fully legal operation (raid chance = 0.1%)
- Can hire 40 workers
- Attracts corporate buyers (+50% income)

**Licensed Facility**:
- Zero heat from growing
- Can hire 75 workers
- Government inspections (pass = bonus income)

**Corporate Farm**:
- End-game location
- Unlimited workers
- Vertical integration (+200% income)
- Prestige hub

### 5.3 Rent & Upkeep

**Daily Rent**: Auto-deducted every 24 real-time hours
- If can't afford rent: Location locked, must pay back rent to access
- Offline rent accumulates (max 7 days, then paused)
- "Pay Rent in Advance" option (1 week = 5% discount)

---

## 6. POLICE RISK SYSTEM

### 6.1 Heat Mechanics

**Heat Level**: 0-100% meter
- Displayed as a red progress bar
- Tooltip shows: "Low Risk" (0-25%), "Medium Risk" (25-60%), "High Risk" (60-85%), "Extreme Risk" (85-100%)

**Heat Generation**:
```
Heat_Per_Second = (Active_Plants × Strain_Tier × 0.01) - Heat_Reduction_Bonuses
```

**Example Calculations**:
- 10 Tier 1 plants: +0.1% heat/second = 6% per minute
- 50 Tier 3 plants: +1.5% heat/second = 90% per minute
- With -50% from upgrades: 45% per minute

**Heat Decay**:
- Passive decay: -0.5% per second when heat > 50%
- Active decay: Clicking "Lay Low" button = -5% heat (60s cooldown)
- Workers (Security Guards): -3% decay per guard

### 6.2 Raid Mechanics

**Raid Trigger**:
- **Random Check Every 60 Seconds**:
  - If Heat < 25%: 0.1% raid chance
  - If Heat 25-50%: 1% raid chance
  - If Heat 50-75%: 5% raid chance
  - If Heat 75-90%: 15% raid chance
  - If Heat > 90%: 30% raid chance

**Raid Warning**:
- 10 second warning (extendable with upgrades)
- Warning sound & red flashing screen
- Emergency Actions available:
  - **Hide Plants** (50% chance to save 50% of plants)
  - **Bribe** (Costs $10,000 × Heat_Level, 70% success rate)
  - **Run** (Lose everything, but no jail time)

**Raid Consequences**:
- **Lose 30-70% of current cash** (random)
- **Lose 40-80% of plants** (random)
- **Lose 1-3 workers** (fired/arrested)
- **Reset heat to 0%**
- **3-hour "Jail Time"** = 50% income penalty

**Raid Protection**:
- Security upgrades reduce loss %
- Lawyers reduce jail time
- Licensed operations almost never get raided (0.1% chance even at 100% heat)

### 6.3 Heat Management Strategy

**Early Game** (Level 1-20):
- Keep heat < 50% at all times
- Manual "Lay Low" clicking
- Don't be greedy with plant count

**Mid Game** (Level 20-50):
- Invest in security upgrades
- Hire Security Guards
- Balance risk vs reward (occasional raids acceptable)

**Late Game** (Level 50+):
- Get Licensed Facility to eliminate raids
- Or min-max raid recovery (insurance upgrades)

---

## 7. PROGRESSION & LEVELING

### 7.1 XP System

**XP Sources**:
| Action | XP Gained |
|--------|-----------|
| Harvest Tier 1 plant | 1 XP |
| Harvest Tier 2 plant | 3 XP |
| Harvest Tier 3 plant | 8 XP |
| Harvest Tier 4 plant | 20 XP |
| Harvest Tier 5 plant | 50 XP |
| Complete Quest | 50-500 XP |
| Survive Raid | 100 XP |
| Discover New Strain | 200 XP |

**XP Required Per Level**:
```
XP_Required = 100 × (Level^1.5)
```

**Examples**:
- Level 1 → 2: 100 XP
- Level 10 → 11: 3,162 XP
- Level 25 → 26: 15,625 XP
- Level 50 → 51: 35,355 XP
- Level 99 → 100: 98,995 XP

### 7.2 Level-Based Unlocks (1-100)

**Early Game (1-20)**:
| Level | Unlock |
|-------|--------|
| 1 | Game Start |
| 2 | Quest System |
| 3 | Backyard Green strain |
| 5 | Grow Tent upgrade, Batch Harvest button |
| 6 | Spare Room building |
| 7 | Auto-Planting research |
| 8 | Northern Lights strain, Carbon Filter |
| 10 | Friend Helper worker |
| 12 | Blue Dream strain, Auto-Harvesting |
| 14 | Basement building |
| 15 | Hydroponic System |
| 16 | Part-Time Grower worker |
| 18 | Batch Operations research |
| 20 | OG Kush strain, **Prestige System Unlocked** |

**Mid Game (21-50)**:
| Level | Unlock |
|-------|--------|
| 22 | Climate Controller |
| 24 | Trimmer worker |
| 25 | Garage building |
| 26 | Quality Breeding research |
| 28 | Sour Diesel strain |
| 30 | Advanced Nutrients |
| 32 | Security Guard worker |
| 35 | Backyard Shed building |
| 36 | Marketing Network research |
| 38 | CO2 Generator |
| 40 | Girl Scout Cookies strain |
| 42 | Master Grower worker |
| 45 | UV Sterilizer |
| 46 | Distribution Chain research |
| 48 | Small Warehouse building |
| 50 | Wedding Cake strain |

**Late Game (51-75)**:
| Level | Unlock |
|-------|--------|
| 52 | Automated Trimmer |
| 54 | Chemist worker |
| 58 | International Export research |
| 60 | Industrial Unit building, Genetic Optimizer |
| 64 | Salesperson worker |
| 65 | Godfather OG strain |
| 70 | Genetic Engineering research |
| 72 | Lawyer worker |
| 75 | Licensed Facility building, Gorilla Glue #4 strain |

**End Game (76-100)**:
| Level | Unlock |
|-------|--------|
| 82 | Lobbyist worker |
| 85 | Purple Haze strain |
| 90 | Corporate Farm building |
| 95 | Unicorn Tears strain (best strain) |
| 100 | **Max Level Rewards**: 1000 Green Coins, Golden Trophy, Special Prestige Bonus |

### 7.3 Milestone Rewards

**Level 10**: "Startup" Title, +10% XP gain
**Level 25**: "Entrepreneur" Title, +15% income
**Level 50**: "Kingpin" Title, +25% income, 100 GC
**Level 75**: "Mogul" Title, +50% income, 300 GC
**Level 100**: "Legend" Title, +100% income, 1000 GC, Exclusive Prestige Upgrades

---

## 8. PRESTIGE SYSTEM

### 8.1 Prestige Overview

**Unlock**: Level 20
**Name**: "Strain Breeding" / "Fresh Start"
**Cost**: Reset all progress (keep achievements & cosmetics)

**Prestige Currency**: **"Genetics Points" (GP)**

### 8.2 Earning Genetics Points

**Formula**:
```
GP_Earned = Floor(Total_Money_Earned / 1,000,000)
```

**Minimum**: Must have earned $10M total to prestige (= 10 GP)

**Example Progressions**:
- First Prestige (~2-3 hours): 10-30 GP
- Second Prestige (~1-2 hours): 40-80 GP
- Third Prestige (~45min): 100-150 GP
- Fifth Prestige: 300+ GP

**GP Bonus Sources**:
- Level 100 reached before prestige: +50 GP
- All achievements completed: +100 GP
- Zero raids during run: +25 GP

### 8.3 Prestige Upgrades

| ID | Name | Effect | Cost (GP) | Max Level |
|----|------|--------|-----------|-----------|
| P1 | Green Thumb | +10% income (permanent) | 5 | 20 |
| P2 | Fast Learner | +15% XP gain | 8 | 15 |
| P3 | Lucky Seeds | +5% yield | 10 | 20 |
| P4 | Head Start | Start with $10,000 | 15 | 10 |
| P5 | Experienced Grower | Start at Level 5 | 25 | 5 |
| P6 | Security Expert | -20% heat generation | 30 | 10 |
| P7 | Offline King | +50% offline earnings | 40 | 8 |
| P8 | Speed Demon | -15% grow time | 50 | 12 |
| P9 | Master Salesman | +25% sell prices | 60 | 10 |
| P10 | Untouchable | -50% raid damage | 80 | 5 |
| P11 | Auto-Investor | Auto-buy cheapest upgrade | 100 | 1 |
| P12 | Seed Vault | Unlock all strains instantly | 150 | 1 |
| P13 | God Mode | 2x everything | 500 | 1 |

**Strategic Paths**:
- **Speed Run**: Fast Learner + Experienced Grower + Head Start
- **Idle Focus**: Offline King + Auto-Investor
- **Risk Taker**: Security Expert + Untouchable
- **Balanced**: Green Thumb + Lucky Seeds + Speed Demon

### 8.4 Prestige Cycle

**Optimal Timing**:
- 1st Prestige: ~$50M earned (50 GP)
- 2nd Prestige: ~$200M (200 GP)
- 3rd+: When progress slows (usually every 100-200 GP gained)

**What Resets**:
- Level → 1
- Money → Starting amount
- All buildings, upgrades, workers
- Plants, heat, progress

**What Keeps**:
- Genetics Points & Prestige Upgrades
- Achievements
- Total Stats (tracked separately)
- Green Coins
- Cosmetics

---

## 9. QUEST SYSTEM

### 9.1 Quest Types

1. **Tutorial Quests** (one-time, linear)
2. **Story Quests** (progression milestones)
3. **Daily Quests** (refresh every 24h, 3 available)
4. **Achievements** (permanent, see section 11)

### 9.2 Tutorial Quests (First 20 minutes)

| # | Quest Name | Objective | Reward |
|---|------------|-----------|--------|
| T1 | Your First Plant | Plant 1 seed | $50, 10 XP |
| T2 | Patience is Key | Harvest 1 plant | $100, 25 XP |
| T3 | Small Business | Earn $500 total | $200, 50 XP |
| T4 | Expansion | Buy Grow Tent upgrade | $300, 75 XP |
| T5 | Quantity Over Quality | Harvest 10 plants | $500, 100 XP |
| T6 | Staying Safe | Keep heat below 30% for 5 minutes | 5 GC, 150 XP |

### 9.3 Story Quests (20 Examples)

| ID | Quest Name | Objective | Reward | Unlock |
|----|------------|-----------|--------|--------|
| SQ1 | Bedroom Entrepreneur | Reach Level 5 | $2,000, 200 XP | Level 3 |
| SQ2 | The Upgrade | Buy Spare Room | $5,000, 300 XP | Level 6 |
| SQ3 | Going Underground | Buy Basement | $25,000, 500 XP | Level 14 |
| SQ4 | Hiring Trouble | Hire first worker | $10,000, 10 GC | Level 10 |
| SQ5 | Close Call | Survive your first raid | $20,000, 15 GC | First raid |
| SQ6 | Quality Control | Unlock OG Kush strain | $50,000, 1000 XP | Level 20 |
| SQ7 | Automation Nation | Unlock auto-harvesting | 20 GC, 1500 XP | Level 12 |
| SQ8 | The Big Time | Reach Level 25 | $100,000, 25 GC | Level 24 |
| SQ9 | Industrial Revolution | Buy Warehouse | $200,000, 2000 XP | Level 48 |
| SQ10 | Going Legit | Buy License & Permits | $500,000, 50 GC | Level 56 |
| SQ11 | Millionaire Club | Earn $1M total | $250,000, 30 GC | Anytime |
| SQ12 | Strain Collector | Unlock 5 different strains | 25 GC, 1000 XP | Anytime |
| SQ13 | Safety First | Buy 3 security upgrades | $150,000, 20 GC | Level 30 |
| SQ14 | Mass Production | Harvest 1000 plants | $300,000, 3000 XP | Anytime |
| SQ15 | Empire Builder | Own 100 grow slots | $1M, 50 GC | Level 40 |
| SQ16 | The Prestige | Prestige for the first time | 100 GP bonus, 100 GC | Level 20+ |
| SQ17 | Speed Runner | Reach Level 20 in under 2 hours | 50 GC | Speedrun |
| SQ18 | Risk Management | Go 24 hours without a raid | 30 GC, 2000 XP | Anytime |
| SQ19 | Corporate Ladder | Hire 10 different workers | $2M, 75 GC | Level 60 |
| SQ20 | End Game | Reach Level 100 | 1000 GC, 10,000 XP | Level 99 |

### 9.4 Daily Quest Pool (3 random per day)

**Tier 1 (Easy)**: 3 GC, $50k
- Harvest 25 plants
- Earn $100k
- Plant 50 seeds
- Gain 500 XP
- Keep heat below 40% for 10 minutes

**Tier 2 (Medium)**: 5 GC, $200k
- Harvest 100 plants
- Earn $500k
- Buy 3 upgrades
- Gain 1000 XP
- Survive a raid

**Tier 3 (Hard)**: 10 GC, $1M
- Harvest 500 plants
- Earn $5M
- Unlock a new strain
- Gain 5000 XP
- Reach next level

**Daily Quest Streak Bonus**:
- 3 days: +5 GC
- 7 days: +25 GC + 500k cash
- 30 days: +100 GC + "Dedicated" title

---

## 10. BALANCING & MATH

### 10.1 Core Formulas

**Upgrade Cost Scaling**:
```
Cost(n) = Base_Cost × (Multiplier^n)
```
- Equipment/Workers: 1.15-1.3x per level
- Buildings: Fixed costs, exponential jumps

**Income Growth**:
```
Income_Per_Second = Σ(Plants × Yield × Price / Growth_Time) × All_Multipliers
```

**Multipliers Stack Multiplicatively**:
```
Total_Multiplier = (1 + Equip1) × (1 + Equip2) × (1 + Worker1) × ... × Prestige_Bonus
```

### 10.2 Progression Curve (Target Times)

#### Early Game (0-30 minutes)
**Goal**: Learn mechanics, reach Level 10

| Time | Level | Cash | Income/sec | Key Milestone |
|------|-------|------|------------|---------------|
| 0min | 1 | $100 | $0.10 | First plant |
| 5min | 3 | $500 | $0.50 | 3 plants growing |
| 10min | 5 | $2,000 | $2 | Grow tent upgrade |
| 15min | 7 | $8,000 | $8 | Auto-planting unlocked |
| 20min | 9 | $30,000 | $30 | Basement saving |
| 30min | 12 | $100,000 | $100 | Auto-harvesting unlocked |

**Upgrade Path**:
- Buy: LED Lights L1-5, Grow Tent L1-3, Spare Room
- Hire: 1 Friend Helper
- Strains: Schwag → Backyard Green → Northern Lights

#### Mid Game (30min - 3 hours)
**Goal**: Reach Level 30, unlock OG Kush, first prestige consideration

| Time | Level | Cash | Income/sec | Key Milestone |
|------|-------|------|------------|---------------|
| 45min | 16 | $500,000 | $500 | Part-Time Grower |
| 1h | 20 | $2M | $2,000 | **Prestige Available** |
| 1.5h | 24 | $10M | $10,000 | Garage building |
| 2h | 28 | $50M | $50,000 | Sour Diesel unlocked |
| 3h | 32 | $250M | $250,000 | Security Guard workers |

**Upgrade Path**:
- Buildings: Basement → Garage
- Equipment: All L10+, Hydroponic System
- Workers: 3 Helpers, 2 Growers, 1 Security
- Research: All automation unlocked

**First Prestige Decision**:
- Option A: Prestige at $50M (50 GP) after 1.5-2h
- Option B: Push to $200M (200 GP) in 3-4h

#### Late Game (3-10 hours)
**Goal**: Level 50-75, Warehouse/Licensed operations

| Time | Level | Cash | Income/sec |
|------|-------|------|------------|
| 4h | 40 | $1B | $1M |
| 6h | 50 | $10B | $10M |
| 8h | 60 | $100B | $100M |
| 10h | 70 | $1T | $1B |

**After 2-3 Prestiges**: Each run takes 1-2 hours to previous peak

#### End Game (10+ hours, Post-Prestige)
**Goal**: Level 100, all upgrades maxed, collecting achievements

- Prestige every 1-2 hours
- Push for specific achievements
- Min-max prestige upgrade combos
- Collect all strains and cosmetics

### 10.3 Idle vs Active Balance

**Income Comparison** (Level 30, 1 hour AFK):

| Play Style | Income | Multiplier |
|------------|--------|------------|
| Completely Idle | $50M × 0.6 = $30M | 0.6x |
| Check every 10min | $50M × 0.9 = $45M | 0.9x |
| Active (playing) | $50M × 1.0 = $50M | 1.0x |
| Active + clicking | $50M × 1.2 = $60M | 1.2x |

**Offline Earnings**:
- Max offline time: 8 hours (base)
- With upgrades: 24 hours
- Offline income = 60% of active rate
- Can spend 100 GC to double offline earnings on collection

### 10.4 Green Coin Economy

**Average GC Earned Per Hour** (active play):
- Early (L1-20): ~15 GC/hour (mostly levels + quests)
- Mid (L20-50): ~25 GC/hour (achievements unlocking)
- Late (L50+): ~40 GC/hour (faster leveling + dailies)
- With Prestige: +100 GC per run (1-2h each)

**GC Spending Priority**:
1. First 100 GC: Save for Offline Earnings 2x
2. Next 200 GC: Speed boosts during active play
3. After: Cosmetics or extra slots

---

## 11. ACHIEVEMENTS (30+)

### 11.1 Progress Achievements

| ID | Name | Description | Reward | Rarity |
|----|------|-------------|--------|--------|
| A1 | First Harvest | Harvest your first plant | 5 GC | 100% |
| A2 | Green Fingers | Harvest 100 plants | 10 GC | Common |
| A3 | Farming Empire | Harvest 10,000 plants | 50 GC | Rare |
| A4 | Harvest God | Harvest 100,000 plants | 100 GC | Epic |
| A5 | Penny Pincher | Earn $1,000 | 5 GC | 100% |
| A6 | Money Maker | Earn $1 Million | 15 GC | Common |
| A7 | Millionaire | Earn $100 Million | 40 GC | Rare |
| A8 | Billionaire | Earn $10 Billion | 75 GC | Epic |
| A9 | Trillionaire | Earn $1 Trillion | 150 GC | Legendary |

### 11.2 Level Achievements

| ID | Name | Description | Reward |
|----|------|-------------|--------|
| A10 | Novice Grower | Reach Level 10 | 10 GC |
| A11 | Experienced | Reach Level 25 | 25 GC |
| A12 | Expert Cultivator | Reach Level 50 | 50 GC |
| A13 | Master Grower | Reach Level 75 | 75 GC |
| A14 | Cannabis Legend | Reach Level 100 | 200 GC |

### 11.3 Strain Achievements

| ID | Name | Description | Reward |
|----|------|-------------|--------|
| A15 | Strain Enthusiast | Unlock 5 strains | 15 GC |
| A16 | Strain Collector | Unlock all 12 strains | 75 GC |
| A17 | Quality Connoisseur | Harvest 100 Tier 5 plants | 50 GC |

### 11.4 Risk & Security Achievements

| ID | Name | Description | Reward |
|----|------|-------------|--------|
| A18 | Close Call | Survive your first raid | 10 GC |
| A19 | Raid Veteran | Survive 10 raids | 30 GC |
| A20 | Untouchable | Go 48 hours without a raid | 50 GC |
| A21 | Smooth Operator | Keep heat below 20% for 1 hour | 25 GC |
| A22 | Living Dangerously | Operate at 90%+ heat for 10 minutes | 40 GC |

### 11.5 Speed & Efficiency Achievements

| ID | Name | Description | Reward |
|----|------|-------------|--------|
| A23 | Speed Demon | Reach Level 20 in under 1 hour | 50 GC |
| A24 | Efficient Grower | Harvest 100 plants in 10 minutes | 30 GC |
| A25 | Mass Production | Own 500 grow slots | 60 GC |

### 11.6 Business Achievements

| ID | Name | Description | Reward |
|----|------|-------------|--------|
| A26 | Team Builder | Hire 5 workers | 20 GC |
| A27 | Corporation | Hire all worker types | 75 GC |
| A28 | Real Estate Mogul | Own all buildings | 100 GC |

### 11.7 Prestige Achievements

| ID | Name | Description | Reward |
|----|------|-------------|--------|
| A29 | Fresh Start | Prestige for the first time | 50 GC |
| A30 | Prestige Master | Prestige 10 times | 150 GC |
| A31 | God Tier | Earn 1000 GP total | 250 GC |

### 11.8 Secret/Hidden Achievements

| ID | Name | Description | Reward |
|----|------|-------------|--------|
| A32 | Lucky Find | Trigger a 2x price event | 25 GC |
| A33 | Unicorn Hunter | Unlock Unicorn Tears strain | 100 GC |
| A34 | Completionist | Unlock all achievements | 500 GC, Exclusive Title |
| A35 | Dedicated | Login 30 days in a row | 100 GC |

---

## 12. UI/UX DESIGN

### 12.1 Main Screen Layout

```
┌─────────────────────────────────────────────────────┐
│  [Logo] Cannabis Manager         [Lvl 25] [1,234 GC]│
│  [$12,450,000]  [XP: 15,234/20,000] ━━━━━━━━━━░░ 76%│
├─────────────────────────────────────────────────────┤
│                                                      │
│  🌱 🌿 🌿 🌿 🌱 🌱 🌿 🌿    [Grow Area Visual]      │
│  🌿 🌿 🌱 🌿 🌿 🌿 🌿 🌱    (Plant sprites)          │
│  🌱 🌿 🌿 🌿 🌿 🌱 🌿 🌿    Click to harvest         │
│  🌿 🌿 🌿 🌱 🌿 🌿 🌿 🌿                             │
│                                                      │
│  Heat: [████████░░░░░░░░░░] 40% (Medium Risk)      │
│                                                      │
│  [Plant Seed] [Harvest All] [Lay Low]              │
│                                                      │
├─────────────────────────────────────────────────────┤
│  Stats: 125 plants/sec | $45k/sec                   │
├─────────────────────────────────────────────────────┤
│  [Shop] [Workers] [Buildings] [Research] [Quests]   │
└─────────────────────────────────────────────────────┘
```

### 12.2 Key UI Elements

**Top Bar**:
- Current money (live updating)
- Level + XP bar (progress visual)
- Green Coins balance
- Settings gear icon

**Grow Area** (Center):
- Grid layout of plant slots (1-2500)
- Each plant shows growth stage visually
- Click plant to harvest (satisfying animation)
- Empty slots show "+" icon (click to plant)

**Action Buttons**:
- Large, responsive, immediate feedback
- Cooldowns shown as circular progress
- Disabled states clearly communicated

**Heat Meter**:
- Color coded: Green (safe) → Yellow → Orange → Red (danger)
- Pulse animation when > 75%
- Tooltip with exact %

**Bottom Nav**:
- Tab navigation (persistent)
- Badge notifications (e.g., "3" on Quests tab)

### 12.3 Shop Interface

**Categories** (left sidebar):
- Equipment (wrench icon)
- Buildings (house icon)
- Workers (person icon)
- Security (shield icon)
- Research (flask icon)
- Business (briefcase icon)

**Upgrade Card** (repeating list):
```
┌──────────────────────────────────┐
│ [Icon] LED Lights (Level 5)      │
│ -5% grow time per level          │
│                                  │
│ Cost: $12,450                    │
│ [BUY] or [MAX]                   │
└──────────────────────────────────┘
```

**Sorting/Filters**:
- Show: All / Affordable / Owned
- Sort: Cheapest / Most Effective / Newest

### 12.4 Mobile Considerations

- Touch-friendly buttons (min 44px)
- Swipe navigation between tabs
- Haptic feedback on harvests
- Portrait and landscape support
- Offline earnings popup on return

---

## 13. MONETIZATION (NO PAY-TO-WIN)

**Philosophy**: 100% free, no ads required, optional cosmetics only

### 13.1 Optional Ad Watching

**Rewarded Ads** (player choice):
- **Ad Boost**: Watch ad → 2x income for 5 minutes
- **Free GC**: Watch ad → 10-25 GC (once per hour)
- **Instant Grow**: Watch ad → all plants instantly mature (once per hour)
- **Offline Bonus**: Watch ad → +50% offline earnings on next collection

**Frequency Cap**: Max 10 ads per day

### 13.2 Cosmetic Purchases (Green Coins Only)

**Plant Skins** (100-300 GC):
- Neon Glow plants
- Rainbow plants
- Pixel art style
- Autumn colors
- Space-themed

**UI Themes** (200 GC):
- Dark mode
- Neon cyberpunk
- Retro 8-bit
- Nature/wood theme

**Prestige Animations** (500 GC):
- Fireworks
- Confetti explosion
- Cosmic warp

**Player Titles** (50-200 GC):
- "The Cultivator"
- "Weed Wizard"
- "420 Blazer"
- "Green Guru"

---

## 14. TECHNICAL SPECIFICATIONS

### 14.1 Data Storage (LocalStorage)

**Key Structure**:
```javascript
{
  player: {
    level: 1,
    xp: 0,
    money: 100,
    greenCoins: 50,
    prestigePoints: 0
  },
  plants: [
    {id: 1, strain: "schwag", plantedAt: timestamp, slot: 1},
    ...
  ],
  upgrades: {
    E1: {level: 5, purchased: true},
    ...
  },
  buildings: {
    current: "B1",
    owned: ["B1"]
  },
  workers: [
    {type: "W1", count: 2, level: 1},
    ...
  ],
  stats: {
    totalEarned: 1000000,
    totalHarvests: 5000,
    totalRaids: 3,
    playTime: 7200
  },
  quests: {
    active: ["SQ1", "DQ1", "DQ2"],
    completed: ["T1", "T2", "T3"]
  },
  achievements: {
    unlocked: ["A1", "A2", "A5"]
  },
  settings: {
    sound: true,
    music: false,
    notifications: true
  },
  lastSave: timestamp,
  version: "1.0.0"
}
```

### 14.2 Save System

**Auto-Save**: Every 30 seconds
**Manual Save**: Button in settings
**Cloud Save**: Phase 2 (optional Firebase integration)

**Save File Size Target**: < 50KB

### 14.3 Offline Calculation

**On Return**:
1. Calculate time away: `now - lastSave`
2. Cap at max offline time (8-24 hours)
3. Calculate income rate at time of leaving
4. Apply offline multiplier (0.6x)
5. Simulate plant growth cycles
6. Show "Welcome Back" popup with earnings
7. Option to watch ad for bonus

**Formula**:
```javascript
offlineEarnings = baseIncomePerSecond × timeAway × 0.6 × offlineMultipliers
```

### 14.4 Performance Targets

**Frame Rate**: 60 FPS (smooth animations)
**Load Time**: < 2 seconds (first load)
**Save Time**: < 100ms (imperceptible)
**Max Plants Rendered**: 2500 (with sprite pooling)

**Optimization**:
- Sprite pooling for plants
- Debounced calculations (once per second, not per frame)
- RequestAnimationFrame for animations
- Web Workers for heavy calculations (if needed)

---

## 15. AUDIO & VISUAL DESIGN

### 15.1 Sound Effects

**Core Actions**:
- Plant seed: Soft "poof" sound
- Harvest: Satisfying "snip" + cash register ding
- Level up: Triumphant fanfare
- Purchase: "Ka-ching!"
- Raid warning: Siren (pulsing)
- Achievement unlock: Chime

**Ambient**:
- Subtle grow room hum (optional background)
- Gentle rain sounds (can toggle)

### 15.2 Visual Style

**Art Direction**:
- Cartoony, lighthearted, not realistic
- Bright, saturated colors
- Smooth animations (CSS transitions)
- Particle effects on key actions

**Color Palette**:
- Primary: Green (#2ECC71)
- Secondary: Gold (#F1C40F)
- Warning: Orange (#E67E22)
- Danger: Red (#E74C3C)
- Background: Dark gray (#2C3E50)
- Text: White (#FFFFFF)

**Plant Sprites**:
- 4 growth stages (distinct visuals)
- Tier 1: Simple green
- Tier 2: Bushier, lighter green
- Tier 3: Dense, dark green
- Tier 4: Purple hues
- Tier 5: Glistening, rainbow trichomes

---

## 16. FUTURE FEATURES (POST-LAUNCH)

**Phase 2** (1-2 months post-launch):
- Multiplayer leaderboards (total earnings, fastest prestige)
- Cloud save syncing
- More strains (20 total)
- Seasonal events (420 event, Harvest Festival)
- New building: Dispensary Chain

**Phase 3** (3-6 months):
- PvP: Rival grower raids (optional)
- Co-op: Help friends, trade strains
- Custom strain breeding (genetics mini-game)
- Story mode with characters & narrative
- Mobile app (iOS/Android)

**Phase 4** (6-12 months):
- Modding support
- User-generated content
- NFT integration (controversial, optional)
- Expanded universe (edibles business, CBD products)

---

## 17. SUCCESS METRICS & KPIs

### 17.1 Key Performance Indicators

**Retention**:
- Day 1: 50%+
- Day 7: 25%+
- Day 30: 10%+

**Engagement**:
- Avg session length: 5-10 minutes
- Sessions per day: 3-5
- Time to first prestige: 2-3 hours

**Monetization** (if ads implemented):
- Ad view rate: 30%+ of players
- Ad views per DAU: 3-5

**Virality**:
- K-factor: > 0.3 (word of mouth sharing)

### 17.2 Balancing KPIs (Track & Adjust)

- Prestige rate: 1st prestige should be achievable in 2-3h
- Upgrade diversity: All upgrade categories should be purchased equally
- Heat deaths: Raid rate should be ~10% of players per session (not too punishing)
- GC spending: 60% of earned GC should be spent (not hoarded)

---

## 18. APPENDIX: FORMULAS REFERENCE

### Income Formula
```
Income/sec = Σ(Plants[i].yield × Plants[i].price / Plants[i].growTime)
            × Equipment_Mult × Worker_Mult × Prestige_Mult × Business_Mult
```

### XP Required Formula
```
XP(level) = 100 × (level^1.5)
Total_XP_To_Level_N = Σ(100 × i^1.5) for i=1 to N
```

### Upgrade Cost Formula
```
Cost(n) = BaseCost × (Multiplier^n)
Examples:
  - Equipment: BaseCost × (1.15^n)
  - Workers: BaseCost × (1.2^n)
```

### Heat Calculation
```
Heat_Gain = (ActivePlants × StrainTier × 0.01) - Heat_Reductions
Heat_Decay = -0.5% per second (when > 50%)
```

### Raid Chance
```
if Heat < 25%: 0.1%
if Heat < 50%: 1%
if Heat < 75%: 5%
if Heat < 90%: 15%
if Heat >= 90%: 30%
(Checked every 60 seconds)
```

### Prestige Points
```
GP = Floor(TotalMoneyEarned / 1,000,000)
Min: $10M = 10 GP
```

### Offline Earnings
```
Offline = BaseIncome × TimeAway × 0.6 × (1 + OfflineUpgrades)
Max_TimeAway = 8h (base), 24h (with upgrades)
```

---

## 19. CONCLUSION

This Game Design Document provides a comprehensive blueprint for **Cannabis Manager**, a polished idle/clicker game with deep progression, strategic choices, and addictive gameplay loops.

**Core Pillars**:
1. **Accessible**: Easy to learn, hard to master
2. **Rewarding**: Constant sense of progress and unlocks
3. **Strategic**: Meaningful decisions (risk management, upgrade paths)
4. **Replayable**: Prestige system ensures long-term engagement
5. **Fair**: No pay-to-win, respectful of player time

**Estimated Development Time**:
- **Core mechanics**: 2-3 weeks
- **Content & balancing**: 2-3 weeks
- **Polish & testing**: 1-2 weeks
- **Total**: 6-8 weeks for MVP

**Next Steps**:
1. Prototype core loop (plant → grow → harvest)
2. Implement save/load system
3. Build upgrade framework
4. Balance early game (0-30 min)
5. Add progression systems (quests, achievements)
6. Polish & juice (animations, sounds)
7. Beta test & iterate

---

**Document Version**: 1.0
**Last Updated**: 2025-11-13
**Author**: Game Designer
**Status**: Ready for Development

---

*"From bedroom closet to cannabis empire - your journey starts with a single seed."*
