import { collaboWithjksuType } from "../type/typeForSajuClass";
export class collaboWithjksu implements collaboWithjksuType {
  sex: string;
  type: string;
  target: string;
  name: string;
  //* 성별,띠,대상,사용자의 이름
  constructor(name, type, target, sex) {
    this.name = name;
    this.type = type;
    this.target = target;
    this.sex = sex;
  }
  //* 띠별 궁합도
  compatibilityTable = {
    mouse: {
      mouse: "천생연분",
      cow: "천생연분",
      tiger: "보통",
      rabbit: "안맞음",
      dragon: "천생연분",
      snake: "보통",
      horse: "안맞음",
      sheep: "상극",
      monkey: "천생연분",
      chicken: "보통",
      dog: "천생연분",
      pig: "보통",
    },
    cow: {
      mouse: "천생연분",
      cow: "보통",
      tiger: "보통",
      rabbit: "천생연분",
      dragon: "보통",
      snake: "천생연분",
      horse: "상극",
      sheep: "보통",
      monkey: "상극",
      chicken: "보통",
      dog: "천생연분",
      pig: "보통",
    },
    tiger: {
      mouse: "보통",
      cow: "보통",
      tiger: "보통",
      rabbit: "보통",
      dragon: "보통",
      snake: "천생연분",
      horse: "보통",
      sheep: "보통",
      monkey: "보통",
      chicken: "보통",
      dog: "보통",
      pig: "보통",
    },
    rabbit: {
      mouse: "안맞음",
      cow: "천생연분",
      tiger: "보통",
      rabbit: "안맞음",
      dragon: "보통",
      snake: "천생연분",
      horse: "보통",
      sheep: "천생연분",
      monkey: "보통",
      chicken: "보통",
      dog: "천생연분",
      pig: "보통",
    },
    dragon: {
      mouse: "천생연분",
      cow: "보통",
      tiger: "보통",
      rabbit: "보통",
      dragon: "천생연분",
      snake: "보통",
      horse: "보통",
      sheep: "보통",
      monkey: "보통",
      chicken: "보통",
      dog: "보통",
      pig: "보통",
    },
    snake: {
      mouse: "보통",
      cow: "천생연분",
      tiger: "천생연분",
      rabbit: "천생연분",
      dragon: "보통",
      snake: "천생연분",
      horse: "보통",
      sheep: "보통",
      monkey: "보통",
      chicken: "천생연분",
      dog: "보통",
      pig: "보통",
    },
    horse: {
      mouse: "안맞음",
      cow: "상극",
      tiger: "보통",
      rabbit: "보통",
      dragon: "보통",
      snake: "보통",
      horse: "보통",
      sheep: "천생연분",
      monkey: "보통",
      chicken: "보통",
      dog: "보통",
      pig: "보통",
    },
    sheep: {
      mouse: "상극",
      cow: "보통",
      tiger: "보통",
      rabbit: "천생연분",
      dragon: "보통",
      snake: "보통",
      horse: "천생연분",
      sheep: "천생연분",
      monkey: "보통",
      chicken: "보통",
      dog: "보통",
      pig: "천생연분",
    },
    monkey: {
      mouse: "천생연분",
      cow: "상극",
      tiger: "보통",
      rabbit: "보통",
      dragon: "보통",
      snake: "보통",
      horse: "보통",
      sheep: "보통",
      monkey: "천생연분",
      chicken: "보통",
      dog: "보통",
      pig: "보통",
    },
    chicken: {
      mouse: "보통",
      cow: "보통",
      tiger: "보통",
      rabbit: "보통",
      dragon: "보통",
      snake: "천생연분",
      horse: "보통",
      sheep: "보통",
      monkey: "보통",
      chicken: "천생연분",
      dog: "보통",
      pig: "보통",
    },
    dog: {
      mouse: "천생연분",
      cow: "천생연분",
      tiger: "보통",
      rabbit: "천생연분",
      dragon: "보통",
      snake: "보통",
      horse: "보통",
      sheep: "보통",
      monkey: "보통",
      chicken: "보통",
      dog: "천생연분",
      pig: "보통",
    },
    pig: {
      mouse: "보통",
      cow: "보통",
      tiger: "보통",
      rabbit: "보통",
      dragon: "보통",
      snake: "보통",
      horse: "보통",
      sheep: "천생연분",
      monkey: "보통",
      chicken: "보통",
      dog: "보통",
      pig: "천생연분",
    },
  };
  //* 비교할 띠의 종류
  compareType = [
    "mouse",
    "cow",
    "tiger",
    "rabbit",
    "mouse",
    "dragon",
    "snake",
    "horse",
    "sheep",
    "monkey",
    "chicken",
    "pig",
  ];
  //* 타겟(장카설유)의 정보
  compareTarget = {
    karina: ["dragon", "카리나"],
    jang: ["monkey", "장원영"],
    sul: ["monkey", "설윤"],
    yuna: ["sheep", "유나"],
  };

  processInput = () => {
    if (
      !this.compareType.includes(this.type) ||
      !Object.keys(this.compareTarget).includes(this.target)
    ) {
      return "잘못된 입력값입니다.";
    }
    const targetType = this.compareTarget[this.target][0]; //비교대상의 띠
    const targetName = this.compareTarget[this.target][1]; //비교대상의 이름
    const compatibility = this.compatibilityTable[this.type][targetType]; // 궁합결과

    return `안녕하세요 ${this.name}님 당신과 ${targetName}의 궁합은 ${compatibility} 입니다.`;
  };
}

//* return 값은 100점 , 75점, 50점 , 25 점 4개로 정한다.
//* 이름 궁합과 연결시킨다.
