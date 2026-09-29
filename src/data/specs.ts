import type { Power, Range, Role, SpecProfile } from '../types'
import { classProfileMap } from './classes'

// 九分制体验评分：[上手难度, 操作上限, 操作节奏, 机动能力, 生存容错, 团队功能, 爆发反馈, 持续作战]。
// 只描述手感与体验，不代表当前版本的输出、治疗或竞技强度。
type Metrics = [number, number, number, number, number, number, number, number]
type RawSpec = [id: string, sect: string, name: string, role: Role, range: Range, power: Power, metrics: Metrics, tags: string, fantasy: string, strengths: string, weaknesses: string]

const raw: RawSpec[] = [
  ['zixia','纯阳','紫霞功','ranged','mid','内功',[5.0,7.9,6.0,7.2,5.4,7.2,7.2,7.4],'sword taoist blue white graceful field','在脚下展开太极气场，以剑气与道法在中距离压制敌人；气场同时强化自己和身边队友。','站位灵活、机动好，气场兼顾输出与团队增益，道袍御剑的画面很仙。','气场要放在对的位置才有收益，频繁跑动的战斗会损失一部分输出。'],
  ['taixu','纯阳','太虚剑意','melee','melee','外功',[5.6,8.2,7.6,7.9,5.4,6.0,8.1,6.6],'sword taoist blue white graceful field instant','提剑贴身，以剑气层层叠加，在碎星辰气场中打出密集的瞬发剑招。','节奏快、瞬发多，剑招干净利落，追击和位移都很灵活。','按键密度高，贴身时要一边打一边躲机制，身板不算厚。'],
  ['huajian','万花','花间游','ranged','ranged','内功',[6.2,8.6,6.9,5.6,4.4,6.8,7.6,7.6],'brush scholar purple ink graceful dot control','以笔点穴，在敌人身上叠满持续伤害，再用一击引爆；还有大量点穴控制。','持续伤害与引爆的循环很有章法，控制手段多，远程输出稳定。','需要同时盯多个持续伤害的时间，身板脆，被贴身后很吃自保时机。'],
  ['lijing','万花','离经易道','healer','ranged','内功',[5.6,7.9,6.4,5.4,5.0,8.3,5.5,7.0],'brush scholar purple ink graceful hot','以笔尖施针，持续治疗与强力单体急救并用，擅长把倒下边缘的队友拉回来。','单体抬血能力强，救人时的成就感很足，持续治疗铺得开。','群体治疗压力大时比较吃力，需要提前预判谁会掉血。'],
  ['yijin','少林','易筋经','melee','melee','内功',[3.8,6.9,5.6,5.4,7.0,6.0,7.6,6.4],'staff buddhist gold heavy male-only','手持长棍、佛光加身，积攒禅那后以重击打出爆发，是贴身作战的内功武僧。','招式直观、打击感厚重，身板结实，犯错也不容易倒。','只能是男性角色；机动一般，追击远处的目标比较吃力。'],
  ['xisui','少林','洗髓经','tank','melee','内功',[4.0,6.6,5.0,5.0,8.6,7.0,3.6,7.6],'staff buddhist gold heavy male-only','以金刚不坏之身稳住阵线，吸引敌人火力并保护队友，是最稳的坦克心法之一。','减伤和生存非常扎实，第一次当坦克也有足够的犯错空间。','只能是男性角色；节奏偏慢，喜欢快手操作的人可能觉得平淡。'],
  ['bingxin','七秀','冰心诀','ranged','mid','内功',[4.6,7.6,7.1,7.0,5.0,5.6,8.2,6.4],'dualsword dancer pink graceful flamboyant female-only','持双剑起舞，舞步叠加层数，再在剑舞高潮时打出大段爆发。','剑舞动作极其华丽，爆发窗口清晰，打出高潮时反馈非常强。','只能是女性角色；身板一般，爆发节奏被打断时损失明显。'],
  ['yunshang','七秀','云裳心经','healer','ranged','内功',[5.0,8.0,7.0,6.6,5.4,8.1,5.6,6.8],'dualsword dancer pink graceful flamboyant female-only','以舞步照料全队，瞬发与读条治疗交织，救急能力出色。','治疗手段丰富、机动好，被需求度高，舞姿好看。','只能是女性角色；技能多、决策快，熟练前容易手忙脚乱。'],
  ['aoxue','天策','傲血战意','melee','melee','外功',[4.2,7.0,6.4,6.8,6.0,5.6,6.8,7.0],'spear military red heavy mounted','骑在战马上持枪冲阵，在马背上连贯出招，是最有沙场感的外功输出。','冲阵感无可替代，持续输出平稳，骑马移动追击方便。','下马会受到限制，地形复杂或要求下马的机制会打断节奏。'],
  ['tielao','天策','铁牢律','tank','melee','外功',[4.3,6.8,5.6,6.0,8.2,7.2,3.8,7.4],'spear military red heavy','持枪守阵，以稳固的减伤和嘲讽保护队伍，是传统的军阵坦克。','生存稳、仇恨好控，军装持枪的坦克形象很帅。','减伤技能要算好时机，空档期被重击时压力会集中在治疗身上。'],
  ['shanju','藏剑','山居剑意','melee','melee','外功',[5.4,7.8,7.0,7.2,6.0,5.4,7.6,7.2],'heavysword sword wealthy gold flamboyant stance','轻剑问水、重剑山居来回切换：轻剑积攒剑气，重剑挥出大风车与鹤归孤山。','轻重剑切换很有层次，群攻手感爽快，金色特效富丽堂皇。','两套剑法的技能都要熟，初学时键位显得比较多。'],
  ['dujing','五毒','毒经','ranged','ranged','内功',[4.5,7.8,5.6,5.6,6.0,6.2,5.0,8.6],'flute miao purple green poison dark dot pet','吹笛驱蛊，带着蛊宠在敌人身上铺满剧毒，毒越叠越痛。','持续伤害滚雪球的感觉很强，宠物陪伴，远程站位安全。','伤害需要时间铺开，短战斗和频繁换目标时吃亏。'],
  ['butian','五毒','补天诀','healer','ranged','内功',[4.2,7.2,6.0,5.6,6.0,7.8,5.0,7.2],'flute miao purple green graceful pet hot','以蛊虫与笛声为队友续命，持续治疗和群体回复都不错，身边同样有宠物相伴。','上手友好，群疗与单体兼顾，是入门治疗的好选择。','爆发急救略逊于专精单体的治疗，宠物站位偶尔需要照看。'],
  ['jingyu','唐门','惊羽诀','ranged','ranged','外功',[4.0,7.2,5.0,6.6,5.0,5.2,7.8,6.8],'crossbow assassin blue subtle channel','以千机匣远距离狙击，暴雨梨花针等引导招式是它的招牌。','射程远、站位安全，大招打出时的数字反馈很爽。','关键招式要引导或读条，被打断、被迫移动时输出下降明显。'],
  ['tianluo','唐门','天罗诡道','ranged','ranged','内功',[5.2,7.8,6.4,6.0,5.2,5.8,6.6,7.8],'crossbow assassin blue purple dark dot pet','在战场上摆放机关，配合持续伤害与暗器，让机关替你分担火力。','机关玩法独特，持续输出稳，远程作战比较安全。','机关需要提前布置，战斗位置变动大时要重新摆。'],
  ['fenying','明教','焚影圣诀','melee','melee','内功',[5.0,7.9,7.4,7.8,5.6,5.0,8.6,6.0],'dualblade exotic fire gold flamboyant stealth','手持双弯刀在日月之力间切换，积满灵力后打出炽烈爆发，还能隐身突袭。','爆发瞬间日月特效华丽，隐身与位移让切入很灵活。','日月资源顺序打乱会损失大量伤害；贴身时躲机制容易断节奏。'],
  ['mingzun','明教','明尊琉璃体','tank','melee','内功',[5.0,7.2,6.4,7.0,7.8,6.6,4.2,7.2],'dualblade exotic fire gold','以日月之力护体的坦克，双弯刀挡在队伍最前面。','机动性在坦克里很出色，异域造型帅气，拉怪灵活。','需要同时照顾日月资源和减伤，比传统坦克多一层思考。'],
  ['xiaochen','丐帮','笑尘诀','melee','melee','外功',[4.4,7.3,7.3,7.6,6.2,5.0,7.2,7.0],'staff palm hero gold flamboyant','掌法与棒法交替，酒意越浓越能打，降龙掌带着金龙呼啸而出。','追击手段多、机动强，降龙掌的特效与打击感都很足。','掌棒切换和酒的节奏要适应，豪放粗犷的造型不是人人都爱。'],
  ['fenshan','苍云','分山劲','melee','melee','外功',[4.2,7.2,7.0,5.8,7.8,5.6,7.4,6.6],'bladeshield military heavy dark steel','刀盾在手，以怒气驱动连招，挨打越多越能打出狠招。','身板很硬、容错高，刀盾砸下去的打击感扎实。','机动偏弱，追远处目标比较费劲；怒气管理需要一点时间理解。'],
  ['tiegu','苍云','铁骨衣','tank','melee','外功',[4.8,7.5,6.4,5.4,8.9,6.6,4.0,7.8],'bladeshield military heavy dark steel shield','举盾硬扛全场伤害的铁壁，是全游戏生存能力最突出的坦克之一。','非常耐打，盾牌轮廓完整，最能体现“我顶住”的感觉。','盾牌技能与怒气资源都要管理，机动性一般。'],
  ['mowen','长歌','莫问','ranged','ranged','内功',[5.0,7.8,6.0,7.0,5.2,6.4,6.0,7.8],'qin scholar musician jade graceful dot','抚琴成曲，以持续伤害与曲调切换作战，还能用影子位移拉开距离。','抚琴姿态优雅，远程移动灵活，持续输出稳定。','输出依赖持续伤害与读条，被贴身时要及时用影子脱身。'],
  ['xiangzhi','长歌','相知','healer','ranged','内功',[4.6,7.3,5.6,6.6,5.6,8.4,5.0,7.2],'qin scholar musician jade graceful','以琴声为全队疗伤并施加护盾，群体治疗是强项。','群疗出色，团队照顾面广，移动也相对灵活。','单体急救略逊一筹，需要用护盾和预判来弥补。'],
  ['beiao','霸刀','北傲诀','melee','melee','外功',[6.6,8.4,7.6,7.4,6.2,5.2,8.2,6.6],'greatblade wealthy purple heavy flamboyant stance','扛一柄傲霜刀在三种刀式间切换，每种刀式都有一套招式，劈砍凶狠。','打击感非常重，刀式切换带来很高的操作上限。','三套刀式都要熟练，是入门难度较高的近战心法。'],
  ['linghai','蓬莱','凌海诀','melee','melee','外功',[7.2,8.7,7.6,8.9,5.0,5.0,7.4,6.6],'umbrella island jade blue graceful flight pet','执伞御风，能飞到空中作战再落地，海雕独立出招协助攻击。','浮空作战独一份，机动性全游戏顶尖，伞与海雕都很有特色。','上天、落地的时机很讲究，团队副本里的站位限制多，上手门槛高。'],
  ['yinlong','凌雪阁','隐龙诀','melee','melee','外功',[5.8,8.2,8.0,7.0,5.0,6.2,7.8,6.6],'chain assassin red dark subtle control','以链刃在中近距离收放出招，能窃取对手的增益为己所用。','刺客手感流畅，控制强，偷增益的玩法独特。','减伤手段有限，攻击距离要把握准；技能多，显得有些杂。'],
  ['taixuan','衍天宗','太玄经','ranged','ranged','内功',[5.6,8.2,6.6,6.4,5.2,6.0,7.8,7.0],'lantern occult purple stars dark','手提魂灯观星演卦，以符阵与阴阳术数在远处打出成段爆发。','主题神秘独特，远程爆发有章法，魂灯造型亮眼。','术数机制比较抽象，需要时间理解其中的节奏。'],
  ['wufang','药宗','无方','ranged','ranged','内功',[5.0,7.6,6.2,6.0,5.4,6.2,7.4,7.2],'scroll medicine green jade graceful','手持百草卷，寒性与温性招式交替施放，在交替节奏中打出爆发。','医者主题清新，爆发机制独特，远程作战安全。','寒温交替的顺序是入门门槛，顺序乱了会明显掉输出。'],
  ['lingsu','药宗','灵素','healer','ranged','内功',[4.8,7.8,6.0,6.0,5.8,8.6,5.4,7.4],'scroll medicine green jade graceful hot','以药性调和全队，群体治疗量非常出众。','群疗强、需求度高，很容易找到队伍。','同样要处理寒温节奏，单体急救需要额外规划。'],
  ['gufeng','刀宗','孤锋诀','melee','melee','外功',[4.6,7.6,7.2,7.0,6.0,4.8,8.4,6.2],'hengdao wanderer blue steel subtle instant','持唐横刀，围绕拔刀与收刀的节奏蓄势，一刀出鞘打出爆发。','居合拔刀干净利落，爆发窗口清晰，浪客气质很帅。','团队功能较少，节奏被打断后重新蓄势需要时间。'],
  ['shanhai','万灵','山海心诀','ranged','ranged','外功',[4.2,7.2,6.0,7.2,5.8,5.4,7.0,7.4],'bow wild gold green pet','拉弓射箭并召唤神兽乘黄与百兽参战，射术、装填和召唤三套招式配合。','弓箭手与驭兽师合一，远程移动输出舒服，兽群陪伴感强。','三套招式各自独立，要同时照顾箭矢和兽群。'],
  ['zhoutian','段氏','周天功','ranged','ranged','内功',[5.4,7.8,6.4,6.8,5.4,6.6,7.4,7.0],'fan royal white jade graceful control','一阳指与折扇并用，指法打伤害，风与雾的招式控制场面。','贵气十足的折扇造型，控场、爆发与距离掌控兼备。','指法、步法、风雾几套招式要一起理解，初期信息量较大。'],
]

export const specs: SpecProfile[] = raw.map(([id, sect, specName, role, range, power, values, tagString, fantasy, strengths, weaknesses]) => {
  const [difficulty, ceiling, pace, mobility, survivability, utility, burst, sustained] = values
  const tags = tagString.split(' ')
  // 体型标签：少林只收男性体型，七秀只收女性体型，其余门派四体型都可选。
  if (!tags.includes('female-only')) tags.push('male')
  if (!tags.includes('male-only')) tags.push('female')
  return {
    id, className: sect, specName, role, range, power,
    color: classProfileMap.get(sect)?.color ?? '#ffffff',
    metrics: { difficulty, ceiling, pace, mobility, survivability, utility, burst, sustained },
    tags: tags.includes('pet') ? tags : [...tags, 'no-pet'],
    fantasy, strengths, weaknesses,
  }
})
