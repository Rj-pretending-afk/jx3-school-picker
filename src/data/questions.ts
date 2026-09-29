import type { Question } from '../types'

// 13 个固定方向槽位，每个槽位 3 道同方向题，每轮每槽随机抽 1 道。
// 颜值槽位：1 江湖身份、3 角色轮廓、5 兵器、7 招式特效、13 江湖气质；其余为手感。
const questionBank: Question[] = [
  // 1 · 江湖身份（颜值）
  { id:'identity', category:'looks', slot:1, group:'江湖身份', eyebrow:'颜值 · 出身', title:'行走江湖，你想顶着哪种身份？', description:'不用认识门派名，挑一个你愿意长期代入的人设。可多选，点击顺序就是偏好顺序。', options:[
    { id:'taoist', label:'修道之人', hint:'道袍拂尘、御剑乘风，出世又入世', effect:{ tags:['taoist'] } },
    { id:'buddhist', label:'佛门弟子', hint:'僧袍长棍、佛光护体，只收男弟子', effect:{ tags:['buddhist'] } },
    { id:'military', label:'军旅将士', hint:'枪马刀盾、铁血戍边，家国在肩', effect:{ tags:['military'] } },
    { id:'scholar', label:'文人雅士', hint:'笔墨琴书、温文尔雅，出手却不留情', effect:{ tags:['scholar','musician'] } },
    { id:'noble', label:'世家子弟', hint:'名门山庄、皇族贵胄，富贵又潇洒', effect:{ tags:['wealthy','royal'] } },
    { id:'outlander', label:'异域来客', hint:'西域、苗疆或海外仙岛，风土迥异', effect:{ tags:['exotic','miao','island'] } },
    { id:'shadow', label:'暗处刺客', hint:'暗器、链刃、隐身，一击即退', effect:{ tags:['assassin'] } },
  ]},
  { id:'aura', category:'looks', slot:1, group:'江湖身份', eyebrow:'颜值 · 武学意境', title:'你心目中最好看的武功是什么样子？', description:'想象你的角色出招时，旁人第一眼会看到什么。', options:[
    { id:'graceful', label:'仙气飘逸', hint:'衣袂翻飞、身法轻盈，像一幅写意画', effect:{ tags:['graceful'] } },
    { id:'heavy', label:'刚猛厚重', hint:'一招下去地动山摇，打击感拉满', effect:{ tags:['heavy'] } },
    { id:'flamboyant', label:'华丽夺目', hint:'特效炸裂、动作繁复，全场焦点', effect:{ tags:['flamboyant'] } },
    { id:'subtle', label:'干脆利落', hint:'没有多余动作，出手就是要害', effect:{ tags:['subtle'] } },
    { id:'dark', label:'诡秘阴暗', hint:'毒、暗、术，让人看不透', effect:{ tags:['dark'] } },
  ]},
  { id:'arts', category:'looks', slot:1, group:'江湖身份', eyebrow:'颜值 · 奇术', title:'除了刀剑拳脚，你还想学点什么本事？', description:'不少门派的招牌不是兵器，而是独门奇术。', options:[
    { id:'field', label:'道家气场', hint:'在脚下展开太极阵，敌弱我强', effect:{ tags:['field'] } },
    { id:'poison', label:'蛊毒之术', hint:'驱使毒虫、以毒伤人', effect:{ tags:['poison','miao'] } },
    { id:'mechanism', label:'机关暗器', hint:'千机匣、机关阵，远处取人性命', effect:{ tags:['crossbow'] } },
    { id:'occult', label:'星象术数', hint:'观星演卦、阴阳奇门', effect:{ tags:['occult','stars'] } },
    { id:'medicine', label:'医药之道', hint:'百草入药、妙手回春', effect:{ tags:['medicine'] } },
    { id:'music', label:'琴曲舞艺', hint:'以乐入武、以舞为剑', effect:{ tags:['musician','dancer'] } },
    { id:'beast', label:'驭兽之术', hint:'神兽、海雕或蛊虫与你并肩', effect:{ tags:['pet'] } },
  ]},

  // 2 · 团队定位（手感）
  { id:'role', category:'feel', slot:2, group:'团队定位', eyebrow:'手感 · 职责', title:'进副本时，你想站在队伍的哪个位置？', description:'剑网3 的五人本、团队副本都需要防御（坦克）、治疗和输出三种职责。', options:[
    { id:'tank', label:'防御 · 挡在最前面', hint:'吸引敌人攻击、带着队伍推进', effect:{ roles:['tank'] } },
    { id:'healer', label:'治疗 · 照看所有人', hint:'盯着血条，关键时刻把人拉回来', effect:{ roles:['healer'] } },
    { id:'melee', label:'近战输出 · 贴脸打', hint:'冲在敌人身边打出伤害', effect:{ roles:['melee'] } },
    { id:'ranged', label:'远程输出 · 远处打', hint:'保持距离，稳定输出', effect:{ roles:['ranged'] } },
  ]},
  { id:'role-joy', category:'feel', slot:2, group:'团队定位', eyebrow:'手感 · 成就感', title:'打完一场硬仗，哪一刻最让你得意？', description:'不同职责的高光时刻完全不同。', options:[
    { id:'tank', label:'我扛住了首领所有重击', hint:'全队安全，是因为我站在前面', effect:{ roles:['tank'] } },
    { id:'healer', label:'我把残血队友救了回来', hint:'团灭边缘被我拉回来的感觉', effect:{ roles:['healer'] } },
    { id:'melee', label:'我贴脸打出了最高伤害', hint:'近身搏杀、刀刀见血', effect:{ roles:['melee'] } },
    { id:'ranged', label:'我在远处一套带走目标', hint:'站得远、打得准', effect:{ roles:['ranged'] } },
  ]},
  { id:'role-team', category:'feel', slot:2, group:'团队定位', eyebrow:'手感 · 组队', title:'团长在频道里喊人，你最想回哪一句？', description:'选你真正愿意长期承担的，而不是最缺的。', options:[
    { id:'tank', label:'“缺T吗？我来”', hint:'需要记住首领的招式与站位', effect:{ roles:['tank'] } },
    { id:'healer', label:'“奶妈到位”', hint:'队伍需求度最高，但压力也最大', effect:{ roles:['healer'] } },
    { id:'melee', label:'“近战输出一位”', hint:'跟着首领转，躲圈是基本功', effect:{ roles:['melee'] } },
    { id:'ranged', label:'“远程输出一位”', hint:'站位更自由，但要跑得动', effect:{ roles:['ranged'] } },
  ]},

  // 3 · 角色轮廓（颜值）
  { id:'outfit', category:'looks', slot:3, group:'角色轮廓', eyebrow:'颜值 · 门派服饰', title:'哪一种门派服饰最让你心动？', description:'每个门派都有标志性的校服风格，会陪你很久。', options:[
    { id:'robe', label:'道袍仙衣', hint:'素白与青蓝，飘逸出尘', effect:{ tags:['taoist','graceful'] } },
    { id:'monk', label:'僧袍袈裟', hint:'朴素庄严，光头造型', effect:{ tags:['buddhist'] } },
    { id:'armor', label:'铠甲军装', hint:'红黑甲胄，英气逼人', effect:{ tags:['military'] } },
    { id:'scholar', label:'书生长衫', hint:'清雅文气，一派风流', effect:{ tags:['scholar','musician'] } },
    { id:'silk', label:'异域纱衣与银饰', hint:'西域、苗疆的异国风情', effect:{ tags:['exotic','miao'] } },
    { id:'night', label:'夜行劲装', hint:'利落贴身，适合暗处行动', effect:{ tags:['assassin','subtle'] } },
    { id:'brocade', label:'华服锦衣', hint:'世家气派，金玉满身', effect:{ tags:['wealthy','royal','flamboyant'] } },
  ]},
  { id:'silhouette', category:'looks', slot:3, group:'角色轮廓', eyebrow:'颜值 · 战斗剪影', title:'你想以什么姿态站在战场上？', description:'选你愿意长时间看着的画面。', options:[
    { id:'light', label:'轻盈灵动', hint:'身法飘逸，甚至能飞到空中', effect:{ tags:['graceful','flight'] } },
    { id:'mighty', label:'大开大合', hint:'扛着重兵器横扫一片', effect:{ tags:['heavy','greatblade','heavysword'] } },
    { id:'dance', label:'翩然起舞', hint:'剑舞与舞步就是招式', effect:{ tags:['dancer'] } },
    { id:'shield', label:'持盾而立', hint:'刀盾在手，守住身后所有人', effect:{ tags:['bladeshield','shield'] } },
    { id:'mounted', label:'策马冲阵', hint:'骑在战马上持枪冲杀', effect:{ tags:['mounted'] } },
    { id:'companion', label:'伴兽同行', hint:'蛊宠、海雕或神兽跟在身边', effect:{ tags:['pet'] } },
  ]},
  { id:'body', category:'looks', slot:3, group:'角色轮廓', eyebrow:'颜值 · 体型', title:'你打算用哪种体型闯荡江湖？', description:'剑网3 有成男、成女、正太、萝莉四种体型；少林只收男性体型，七秀只收女性体型，其他门派四种都能选。', options:[
    { id:'man', label:'成男', hint:'成年男性，身材高大', effect:{ tags:['male'] } },
    { id:'woman', label:'成女', hint:'成年女性，身姿修长', effect:{ tags:['female'] } },
    { id:'boy', label:'正太', hint:'少年体型，灵巧可爱', effect:{ tags:['male'] } },
    { id:'girl', label:'萝莉', hint:'少女体型，娇小灵动', effect:{ tags:['female'] } },
  ]},

  // 4 · 战斗距离（手感）
  { id:'range', category:'feel', slot:4, group:'战斗距离', eyebrow:'手感 · 距离', title:'你喜欢在离敌人多远的地方出手？', description:'有些心法贴身搏杀，有些在二三十尺外施法，也有介于两者之间的。', options:[
    { id:'melee', label:'贴身近战', hint:'刀剑碰撞、拳拳到肉', effect:{ ranges:['melee'] } },
    { id:'mid', label:'中近距离', hint:'不必贴脸，也不离太远，进退自如', effect:{ ranges:['mid'] } },
    { id:'ranged', label:'远程', hint:'站在后排，视野开阔', effect:{ ranges:['ranged'] } },
  ]},
  { id:'range-danger', category:'feel', slot:4, group:'战斗距离', eyebrow:'手感 · 应对', title:'满地都是首领的技能范围圈，你会？', description:'这道题看你更适应哪种站位节奏。', options:[
    { id:'melee', label:'贴着首领绕，找空隙输出', hint:'近战要跟着首领转身、躲技能', effect:{ ranges:['melee'] } },
    { id:'mid', label:'在边缘游走，随时进出', hint:'中近距离可以灵活调整', effect:{ ranges:['mid'] } },
    { id:'ranged', label:'退到远处安全点慢慢打', hint:'远程离得远，看得清全局', effect:{ ranges:['ranged'] } },
  ]},
  { id:'range-pvp', category:'feel', slot:4, group:'战斗距离', eyebrow:'手感 · 追与逃', title:'在名剑大会（竞技场）里，你更想扮演哪一方？', description:'竞技场的核心就是拉扯距离。', options:[
    { id:'melee', label:'追着对手不放的那个', hint:'贴身压制，让对方无处可逃', effect:{ ranges:['melee'], metrics:{ mobility:7.5 } } },
    { id:'mid', label:'时进时退的那个', hint:'打一套就走，节奏自己掌握', effect:{ ranges:['mid'] } },
    { id:'ranged', label:'远远放风筝的那个', hint:'保持距离，让对手追不上', effect:{ ranges:['ranged'] } },
  ]},

  // 5 · 兵器（颜值）
  { id:'blade', category:'looks', slot:5, group:'兵器', eyebrow:'颜值 · 刀剑', title:'刀剑之中，哪一把最想握在手里？', description:'兵器会一直出现在角色身上，也决定了出招动作。', options:[
    { id:'sword', label:'长剑', hint:'道门御剑，轻灵飘逸', effect:{ tags:['sword'] } },
    { id:'dualsword', label:'双剑', hint:'剑舞翩跹，一双短剑', effect:{ tags:['dualsword'] } },
    { id:'heavysword', label:'轻剑 + 重剑', hint:'一轻一重两把剑随身切换', effect:{ tags:['heavysword'] } },
    { id:'greatblade', label:'大刀', hint:'一柄傲霜刀，劈山断岳', effect:{ tags:['greatblade'] } },
    { id:'hengdao', label:'唐横刀', hint:'居合拔刀，一击定胜负', effect:{ tags:['hengdao'] } },
    { id:'dualblade', label:'双弯刀', hint:'西域弯刀，日月双刃', effect:{ tags:['dualblade'] } },
    { id:'bladeshield', label:'刀与盾', hint:'一手刀一手盾，攻守兼备', effect:{ tags:['bladeshield'] } },
  ]},
  { id:'polearm', category:'looks', slot:5, group:'兵器', eyebrow:'颜值 · 奇兵', title:'比起刀剑，这些兵器哪个更对胃口？', description:'剑网3 的门派兵器五花八门。', options:[
    { id:'spear', label:'长枪', hint:'马上枪法，横扫千军', effect:{ tags:['spear'] } },
    { id:'staff', label:'长棍 / 棒', hint:'少林棍与丐帮打狗棒', effect:{ tags:['staff'] } },
    { id:'palm', label:'赤手掌法', hint:'降龙掌，金龙呼啸而出', effect:{ tags:['palm'] } },
    { id:'chain', label:'链刃', hint:'可收可放，中近距离取命', effect:{ tags:['chain'] } },
    { id:'umbrella', label:'伞', hint:'执伞御风，还能飞上天', effect:{ tags:['umbrella'] } },
    { id:'fan', label:'折扇', hint:'扇中藏锋，指法凌空', effect:{ tags:['fan'] } },
  ]},
  { id:'implement', category:'looks', slot:5, group:'兵器', eyebrow:'颜值 · 法器与远程', title:'远程与法器里，你最想要哪一件？', description:'这些兵器更多是施法或远程攻击的媒介。', options:[
    { id:'brush', label:'笔', hint:'以笔点穴，书生本色', effect:{ tags:['brush'] } },
    { id:'qin', label:'琴', hint:'抚琴成曲，以乐杀敌', effect:{ tags:['qin'] } },
    { id:'flute', label:'笛', hint:'笛声驱蛊，苗疆异术', effect:{ tags:['flute'] } },
    { id:'crossbow', label:'千机匣', hint:'暗器与机关一匣藏尽', effect:{ tags:['crossbow'] } },
    { id:'bow', label:'弓', hint:'拉弓射箭，驭兽同行', effect:{ tags:['bow'] } },
    { id:'lantern', label:'魂灯', hint:'提灯观星，阴阳术数', effect:{ tags:['lantern'] } },
    { id:'scroll', label:'百草卷', hint:'医药典籍，寒温入药', effect:{ tags:['scroll'] } },
  ]},

  // 6 · 操作节奏（手感）
  { id:'pace', category:'feel', slot:6, group:'操作节奏', eyebrow:'手感 · 按键频率', title:'战斗中你希望手有多忙？', description:'有的心法几乎每秒都在按键，有的更讲究时机。', options:[
    { id:'fast', label:'手不停，越快越爽', hint:'瞬发多、连招密', effect:{ metrics:{ pace:8 } } },
    { id:'mid', label:'有快有慢', hint:'平时稳，爆发时手忙', effect:{ metrics:{ pace:6.4 } } },
    { id:'slow', label:'从容一点', hint:'每一下都有分量，不用狂按', effect:{ metrics:{ pace:5 } } },
  ]},
  { id:'pace-cast', category:'feel', slot:6, group:'操作节奏', eyebrow:'手感 · 读条', title:'面对需要读条或引导的招式，你的感受是？', description:'读条：招式要站着蓄一会儿才打出，被打断或移动就会失败。', options:[
    { id:'instant', label:'讨厌读条，要瞬发', hint:'按下去立刻出招', effect:{ tags:['instant'], metrics:{ pace:7.6 } } },
    { id:'mix', label:'有一点可以接受', hint:'关键大招读个条也无妨', effect:{ metrics:{ pace:6.2 } } },
    { id:'channel', label:'喜欢蓄力一击', hint:'读条越长，打出来越痛快', effect:{ tags:['channel'], metrics:{ pace:5.2 } } },
  ]},
  { id:'pace-fatigue', category:'feel', slot:6, group:'操作节奏', eyebrow:'手感 · 长时间游玩', title:'连打三个小时团本，你希望最后手腕还好吗？', description:'操作节奏也决定长期游玩的疲劳感。', options:[
    { id:'grind', label:'累也值得，爽就行', hint:'高频操作带来专注感', effect:{ metrics:{ pace:7.8 } } },
    { id:'steady', label:'张弛有度最好', hint:'有空档喘口气', effect:{ metrics:{ pace:6.2 } } },
    { id:'relaxed', label:'越轻松越好', hint:'节奏舒缓，不想太累', effect:{ metrics:{ pace:5, difficulty:4.2 } } },
  ]},

  // 7 · 招式特效（颜值）
  { id:'palette', category:'looks', slot:7, group:'招式特效', eyebrow:'颜值 · 色盘', title:'哪种招式配色你最看不腻？', description:'颜色旁边都有文字说明。', options:[
    { id:'azure', label:'青蓝剑气', hint:'道门剑光、海天之色', swatches:[{label:'青蓝',color:'#3e92cc'},{label:'雪白',color:'#eef3f8'}], effect:{ tags:['blue','white'] } },
    { id:'violet', label:'紫墨花影', hint:'墨笔、紫花、神秘术法', swatches:[{label:'紫',color:'#9b6fd6'},{label:'墨',color:'#3a3148'}], effect:{ tags:['purple','ink'] } },
    { id:'blossom', label:'粉樱剑舞', hint:'粉色花瓣随剑舞纷飞', swatches:[{label:'粉',color:'#ec7fa9'},{label:'白',color:'#fff0f5'}], effect:{ tags:['pink'] } },
    { id:'golden', label:'金色佛光', hint:'佛光、金龙、富贵金', swatches:[{label:'金',color:'#e8b75c'},{label:'赭',color:'#b27a2b'}], effect:{ tags:['gold'] } },
    { id:'crimson', label:'赤红烈焰', hint:'战血、烈日与火光', swatches:[{label:'赤',color:'#cc3d38'},{label:'橙',color:'#e2792c'}], effect:{ tags:['red','fire'] } },
    { id:'verdant', label:'翠绿碧玉', hint:'药草、毒雾、山林与琴音', swatches:[{label:'翠',color:'#5ac795'},{label:'碧',color:'#1fae9c'}], effect:{ tags:['green','jade'] } },
    { id:'gloom', label:'幽暗玄黑', hint:'暗影、诡术与铁甲', swatches:[{label:'玄',color:'#2b2733'},{label:'暗红',color:'#7a1f2b'}], effect:{ tags:['dark','steel'] } },
  ]},
  { id:'vfx-amount', category:'looks', slot:7, group:'招式特效', eyebrow:'颜值 · 特效浓度', title:'招式特效，你希望有多“满”？', description:'特效浓度影响画面观感，也影响你能不能看清角色本身。', options:[
    { id:'full', label:'满屏华丽', hint:'每一招都是一场烟花', effect:{ tags:['flamboyant'] } },
    { id:'clean', label:'干净利落', hint:'看得清刀光剑影和动作本身', effect:{ tags:['subtle','steel'] } },
    { id:'ink', label:'写意飘逸', hint:'像水墨画一样留白', effect:{ tags:['graceful','ink'] } },
    { id:'impact', label:'厚重震地', hint:'特效不必多，但每下都要有分量', effect:{ tags:['heavy'] } },
  ]},
  { id:'imagery', category:'looks', slot:7, group:'招式特效', eyebrow:'颜值 · 意象', title:'哪种意象最适合出现在你的招式里？', description:'选你希望在技能特效中反复看到的东西。', options:[
    { id:'sunmoon', label:'日月', hint:'烈日与弯月交替', effect:{ tags:['fire','exotic'] } },
    { id:'stars', label:'星辰', hint:'星图、卦象与阴阳', effect:{ tags:['stars','occult'] } },
    { id:'snow', label:'风雪剑光', hint:'清冷的剑气与雪色', effect:{ tags:['white','sword'] } },
    { id:'sea', label:'山海云涛', hint:'海岛、神兽与云涛', effect:{ tags:['island','wild','jade'] } },
    { id:'flower', label:'花与舞', hint:'花瓣与舞袖', effect:{ tags:['pink','dancer','purple'] } },
    { id:'dragon', label:'金龙佛光', hint:'降龙掌与佛门金光', effect:{ tags:['gold','palm','buddhist'] } },
    { id:'venom', label:'毒虫与迷雾', hint:'蛊虫、毒雾与诡术', effect:{ tags:['poison','dark'] } },
  ]},

  // 8 · 管理密度（手感）
  { id:'tracking', category:'feel', slot:8, group:'管理密度', eyebrow:'手感 · 信息量', title:'战斗时你愿意同时盯几样东西？', description:'比如持续伤害的剩余时间、资源层数、增益状态。', options:[
    { id:'many', label:'越多越好，全盘掌控', hint:'多个计时同时运转也不慌', effect:{ tags:['dot'], metrics:{ difficulty:6, ceiling:8.2 } } },
    { id:'some', label:'两三样刚好', hint:'有东西要管，但别太杂', effect:{ metrics:{ difficulty:5, ceiling:7.6 } } },
    { id:'few', label:'越少越好', hint:'专心打就行', effect:{ metrics:{ difficulty:4, ceiling:7 } } },
  ]},
  { id:'companion-mech', category:'feel', slot:8, group:'管理密度', eyebrow:'手感 · 宠物与机关', title:'战斗中有个帮手替你出招，你觉得？', description:'五毒的蛊宠、蓬莱的海雕、万灵的兽群、唐门的机关都会独立行动。', options:[
    { id:'pet', label:'很喜欢，热闹又有陪伴感', hint:'愿意照看它的位置和状态', effect:{ tags:['pet'] } },
    { id:'solo', label:'不要，我只管自己', hint:'所有伤害都出自我手', effect:{ tags:['no-pet'] } },
  ]},
  { id:'mechanic', category:'feel', slot:8, group:'管理密度', eyebrow:'手感 · 独门机制', title:'哪种独门机制最吸引你？', description:'剑网3 很多心法都有自己的特殊规则。', options:[
    { id:'stance', label:'切换形态', hint:'轻重剑、三种刀式来回切', effect:{ tags:['stance'] } },
    { id:'field', label:'摆放气场', hint:'在地上展开气场，站位即输出', effect:{ tags:['field'] } },
    { id:'dot', label:'铺满持续伤害', hint:'毒、穴、曲，越叠越痛', effect:{ tags:['dot'] } },
    { id:'control', label:'点穴控制', hint:'让对手动弹不得', effect:{ tags:['control'] } },
    { id:'stealth', label:'隐身突袭', hint:'从暗处出现，一套带走', effect:{ tags:['stealth','assassin'] } },
    { id:'flight', label:'浮空作战', hint:'飞到空中，居高临下', effect:{ tags:['flight'] } },
  ]},

  // 9 · 上手门槛（手感）
  { id:'difficulty', category:'feel', slot:9, group:'上手门槛', eyebrow:'手感 · 上手难度', title:'刚开始玩，你希望多快能打出像样的循环？', description:'上手难度 = 理解基础循环并稳定打出来的门槛。', options:[
    { id:'easy', label:'越快越好', hint:'几个小时就能上手', effect:{ metrics:{ difficulty:4 } } },
    { id:'normal', label:'花几天学学也行', hint:'有点门槛才有意思', effect:{ metrics:{ difficulty:5.2 } } },
    { id:'hard', label:'难一点才好玩', hint:'愿意啃攻略、反复练习', effect:{ metrics:{ difficulty:6.6 } } },
  ]},
  { id:'difficulty-guide', category:'feel', slot:9, group:'上手门槛', eyebrow:'手感 · 学习方式', title:'你打算怎么学一个新心法？', description:'游戏里有武学助手可以看连招教学，社区里也有大量攻略。', options:[
    { id:'follow', label:'跟着武学助手打就行', hint:'不想看长篇攻略', effect:{ metrics:{ difficulty:4 } } },
    { id:'read', label:'看一两篇攻略', hint:'了解基本思路就够', effect:{ metrics:{ difficulty:5.2 } } },
    { id:'study', label:'研究技能数据和配装', hint:'把每个细节吃透', effect:{ metrics:{ difficulty:6.4 } } },
  ]},
  { id:'difficulty-mistake', category:'feel', slot:9, group:'上手门槛', eyebrow:'手感 · 失误', title:'打错一个技能顺序，你能接受多大的损失？', description:'有的心法打乱顺序影响不大，有的会明显掉输出。', options:[
    { id:'forgiving', label:'最好影响不大', hint:'容错高、循环简单', effect:{ metrics:{ difficulty:4, survivability:7 } } },
    { id:'some', label:'有点影响也正常', hint:'知道错了下次改', effect:{ metrics:{ difficulty:5.2 } } },
    { id:'strict', label:'严格才有意思', hint:'顺序越讲究越有钻研价值', effect:{ metrics:{ difficulty:6.4, ceiling:8.3 } } },
  ]},

  // 10 · 操作上限（手感）
  { id:'ceiling', category:'feel', slot:10, group:'操作上限', eyebrow:'手感 · 钻研空间', title:'熟练以后，你还想有多少可以钻研的东西？', description:'操作上限 = 熟练后还能继续优化的深度，与上手难度是两回事。', options:[
    { id:'deep', label:'深不见底', hint:'玩几年都有新东西', effect:{ metrics:{ ceiling:8.5 } } },
    { id:'moderate', label:'有一定深度', hint:'能进步，但不必太卷', effect:{ metrics:{ ceiling:7.6 } } },
    { id:'shallow', label:'学会就够', hint:'稳定发挥比极限优化重要', effect:{ metrics:{ ceiling:6.8 } } },
  ]},
  { id:'ceiling-rank', category:'feel', slot:10, group:'操作上限', eyebrow:'手感 · 目标', title:'你玩这个心法的长期目标是？', description:'这会决定你需要多大的成长空间。', options:[
    { id:'top', label:'冲排名、打高分', hint:'竞技场段位或团本顶尖', effect:{ metrics:{ ceiling:8.5, difficulty:6 } } },
    { id:'solid', label:'在团里站稳脚跟', hint:'不拖后腿，偶尔亮眼', effect:{ metrics:{ ceiling:7.6 } } },
    { id:'casual', label:'开心就好', hint:'日常、外观、社交更重要', effect:{ metrics:{ ceiling:6.8, difficulty:4.2 } } },
  ]},
  { id:'ceiling-reward', category:'feel', slot:10, group:'操作上限', eyebrow:'手感 · 回报', title:'高手和新手打同一个心法，你希望差距有多大？', description:'差距越大，说明操作的回报越高。', options:[
    { id:'huge', label:'天壤之别', hint:'操作好就是能打出两倍效果', effect:{ metrics:{ ceiling:8.5 } } },
    { id:'fair', label:'有差距但不夸张', hint:'练习有回报，新手也不至于太差', effect:{ metrics:{ ceiling:7.5 } } },
    { id:'small', label:'差不多就好', hint:'不想被操作卡住', effect:{ metrics:{ ceiling:6.8 } } },
  ]},

  // 11 · 循环偏好（手感）
  { id:'burst', category:'feel', slot:11, group:'循环偏好', eyebrow:'手感 · 伤害节奏', title:'你更喜欢哪种伤害节奏？', description:'爆发：短时间内打出大量伤害；持续：伤害平稳、越打越多。', options:[
    { id:'burst', label:'蓄势一波爆发', hint:'积攒后一套打出最高伤害', effect:{ metrics:{ burst:8.2 } } },
    { id:'even', label:'爆发与持续兼顾', hint:'两者都要一些', effect:{ metrics:{ burst:7, sustained:7 } } },
    { id:'sustained', label:'平稳持续输出', hint:'伤害慢慢滚雪球', effect:{ metrics:{ sustained:8 } } },
  ]},
  { id:'rotation-style', category:'feel', slot:11, group:'循环偏好', eyebrow:'手感 · 出招方式', title:'哪种出招方式最符合你的性格？', description:'同样是打伤害，过程可以很不一样。', options:[
    { id:'combo', label:'一气呵成的连招', hint:'瞬发接瞬发，行云流水', effect:{ tags:['instant'], metrics:{ pace:7.5 } } },
    { id:'plant', label:'先布局再收割', hint:'铺持续伤害、摆机关气场', effect:{ tags:['dot','field'] } },
    { id:'charge', label:'蓄力一击', hint:'读条或引导，打出去就是大数字', effect:{ tags:['channel'], metrics:{ burst:7.6 } } },
  ]},
  { id:'control-style', category:'feel', slot:11, group:'循环偏好', eyebrow:'手感 · 控制', title:'除了打伤害，你还想要多少控场能力？', description:'点穴、定身、击退等控制在竞技场里尤其重要。', options:[
    { id:'lots', label:'控制越多越好', hint:'让对手动弹不得', effect:{ tags:['control'], metrics:{ utility:6.5 } } },
    { id:'some', label:'够用就行', hint:'关键时刻打断一下', effect:{ metrics:{ utility:6 } } },
    { id:'none', label:'专心打伤害', hint:'控制交给队友', effect:{ metrics:{ utility:5, burst:7.6 } } },
  ]},

  // 12 · 机动容错（手感）
  { id:'mobility', category:'feel', slot:12, group:'机动容错', eyebrow:'手感 · 机动', title:'战斗中你需要多少位移能力？', description:'剑网3 的轻功很自由，但战斗中的位移技能因心法而异。', options:[
    { id:'high', label:'满场飞', hint:'位移多，想去哪就去哪', effect:{ metrics:{ mobility:8 } } },
    { id:'mid', label:'够躲技能就行', hint:'有几个位移就好', effect:{ metrics:{ mobility:6.6 } } },
    { id:'low', label:'站稳比跑动重要', hint:'不太需要位移', effect:{ metrics:{ mobility:5.4 } } },
  ]},
  { id:'survival', category:'feel', slot:12, group:'机动容错', eyebrow:'手感 · 生存', title:'被首领或对手集火时，你希望自己多耐打？', description:'生存容错 = 减伤、自疗和犯错后的恢复空间。', options:[
    { id:'tanky', label:'皮糙肉厚', hint:'挨几下也不怕', effect:{ metrics:{ survivability:7.8 } } },
    { id:'normal', label:'普通就好', hint:'有保命技能就行', effect:{ metrics:{ survivability:6 } } },
    { id:'glass', label:'脆一点没关系', hint:'靠走位和操作活下来', effect:{ metrics:{ survivability:5 } } },
  ]},
  { id:'escape', category:'feel', slot:12, group:'机动容错', eyebrow:'手感 · 危机', title:'被三个对手围住了，你的第一反应是？', description:'这道题看你靠什么活下来。', options:[
    { id:'fly', label:'飞走，谁也追不上', hint:'靠机动脱身', effect:{ metrics:{ mobility:8.2 } } },
    { id:'endure', label:'硬扛，看谁先倒', hint:'靠减伤和血量', effect:{ metrics:{ survivability:7.8 } } },
    { id:'control', label:'控住他们再说', hint:'靠点穴和控制', effect:{ tags:['control'], metrics:{ utility:6.4 } } },
  ]},

  // 13 · 江湖气质（颜值）
  { id:'path', category:'looks', slot:13, group:'江湖气质', eyebrow:'颜值 · 心之所向', title:'在江湖里，你想活成什么样的人？', description:'选的是长期人设，没有对错。', options:[
    { id:'hero', label:'行侠仗义', hint:'为国为民，侠之大者', effect:{ tags:['hero','military'] } },
    { id:'free', label:'逍遥出世', hint:'修道、观海、不问世事', effect:{ tags:['taoist','island','graceful'] } },
    { id:'wanderer', label:'快意恩仇', hint:'一人一刀，恩怨分明', effect:{ tags:['wanderer','assassin'] } },
    { id:'noble', label:'富贵风流', hint:'世家公子，挥金如土', effect:{ tags:['wealthy','royal'] } },
    { id:'healer', label:'悬壶济世', hint:'以医术与慈悲救人', effect:{ tags:['medicine','buddhist'] } },
    { id:'mystic', label:'神秘莫测', hint:'异术在身，让人看不透', effect:{ tags:['occult','miao','dark'] } },
  ]},
  { id:'impression', category:'looks', slot:13, group:'江湖气质', eyebrow:'颜值 · 第一印象', title:'你希望别人第一眼怎么形容你的角色？', description:'一个字就好。', options:[
    { id:'xian', label:'仙', hint:'清冷出尘', effect:{ tags:['graceful','white'] } },
    { id:'shuai', label:'飒', hint:'干净利落，帅气逼人', effect:{ tags:['subtle','steel'] } },
    { id:'gui', label:'贵', hint:'金玉满身，气度不凡', effect:{ tags:['wealthy','royal','gold'] } },
    { id:'meng', label:'猛', hint:'刚猛无匹，望而生畏', effect:{ tags:['heavy'] } },
    { id:'mei', label:'美', hint:'华丽灵动，赏心悦目', effect:{ tags:['dancer','flamboyant','pink'] } },
    { id:'xie', label:'邪', hint:'诡秘危险，亦正亦邪', effect:{ tags:['dark','poison'] } },
  ]},
  { id:'companion', category:'looks', slot:13, group:'江湖气质', eyebrow:'颜值 · 同行', title:'闯荡江湖，你希望身边有谁作伴？', description:'这里只问画面，不问手感。', options:[
    { id:'horse', label:'一匹战马', hint:'人马合一，驰骋沙场', effect:{ tags:['mounted'] } },
    { id:'creature', label:'灵兽或蛊虫', hint:'海雕、神兽、毒虫随行', effect:{ tags:['pet'] } },
    { id:'instrument', label:'一张琴、一支笔', hint:'文人的风雅随身', effect:{ tags:['qin','brush'] } },
    { id:'alone', label:'一人一兵', hint:'孤身一人，只有兵器相伴', effect:{ tags:['no-pet','wanderer'] } },
  ]},
]

const indifferentOption = { id:'any', label:'我无所谓', hint:'与其他选项互斥；本题不限制心法，并计入门派探索倾向', effect:{} }

export const questions: Question[] = questionBank.map((question) => ({ ...question, options:[...question.options.filter((option) => option.id !== 'any'), indifferentOption] }))

const shuffle = <T,>(items: T[]) => {
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swap]] = [next[swap], next[index]]
  }
  return next
}

export function createQuestionSet(): Question[] {
  return Array.from({ length:13 }, (_, index) => {
    const slot = index + 1
    return shuffle(questions.filter((question) => question.slot === slot))[0]
  })
}
