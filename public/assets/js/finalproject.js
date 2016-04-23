$(document).ready(function() {
  $("#speakermute").hide()
  $('#close').hide();
  $('#attack').hide();
  $('#flee').hide();
  $('#battle').hide();
  $(".attacking").on('click', "#attack", battle);
  $('#myModal').on('shown.bs.modal', function() {
    $('#myInput').focus()
  })

  $('#myModal').modal('show');
  $('.play').on('click', function() {
    $('.type-it').typeIt({
      strings: ['This is the story of a princess', 'that was captured by an evil orc.', 'The prince, Lazarus, came to the rescue.', 'Help Lazarus find his princess', 'by fighting the evil orc at this end of the stage!'],
      speed: 50,
      lifeLike: true,
      cursor: true
    }).after(function() {
      $('.play').hide();
      $('#close').show();
      theme = new Audio('assets/sound/theme.mp3');
      theme.play();
      theme.volume = 0.3;
      $("#prompt").scrollTop = $("#prompt").scrollHeight;
    });
  });

  $("#speaker").on("click", function() {
    theme.pause();
    $("#speakermute").show();
    $("#speaker").hide();
  });

  $("#speakermute").on("click", function() {
    theme.play();
    $("#speaker").show();
    $("#speakermute").hide();
  });

  $(".footerItems").hover(function(){
    $(this).css("opacity", "0.4");
    $(this).css("filter", "alpha(opacity=40)");
    }, function(){
    $(this).css("opacity", "1");
    $(this).css("filter", "alpha(opacity=100)");
  });

  $(".nav-items").hover(function(){
    $(this).css("color", "gray");
    }, function(){
    $(this).css("color", "white");
  });

  // if ($(window).width() < 768) {
  //   $("#footer").css("position", "absolute");
  // } else {
  //   $("#footer").css("position", "fixed");
  // };
});

var wall = new Audio('assets/sound/wall.mp3');

/*The area and each number is being defined as a component within the area of the game*/
var area = [
  [0, 0, 0, 3, 0, 0],
  [0, 2, 1, 1, 1, 0],
  [0, 1, 0, 0, 2, 0],
  [0, 1, 0, 0, 1, 1],
  [4, 1, 1, 1, 1, 1],
];

currentMonster = null;
turn = null;
bossDefeated = false;

goblin1 = {
  rep: 2,
  hp: 5,
  attack: 2,
  defense: 0,
  currentPosition: {
    x: 1,
    y: 1,
    id: 1
  }
};

goblin2 = {
  rep: 2,
  hp: 5,
  attack: 2,
  defense: 0,
  currentPosition: {
    x: 4,
    y: 2,
    id: 2
  }
};

orc = {
  rep: 3,
  hp: 10,
  attack: 4,
  defense: 2,
  currentPosition: {
    x: 3,
    y: 0,
    id: 3
  }
};

hero = {
  rep: 4,
  hp: 20,
  attack: 4,
  defense: 1,
  currentPosition: {
    x: 0,
    y: 4
  }
};

var wall = {
  rep: 0
};

var walk = {
  rep: 1
};

treasure = {
  rep: 5
};


/*All the functions within the game are being defined in this section*/
var battle = function() {
  if (currentRep === 2) {
    if ((hero.currentPosition.x === 1 && hero.currentPosition.y === 2) || (hero.currentPosition.x === 2 && hero.currentPosition.y === 1)) {
      currentMonster = goblin1;
    } else {
      currentMonster = goblin2;
    }
  } else {
    currentMonster = orc;
  }
  while ((currentRep === 2 || currentRep === 3) && (currentMonster.hp > 0 || hero.hp > 0)) {
    var sword = new Audio('assets/sound/sword.mp3')
    sword.play();
    hero.hp -= (currentMonster.attack - hero.defense);
    $("#prompt").append("You hit the monster and did " + hero.attack + " damage!" + "<br>");
    currentMonster.hp -= (hero.attack - currentMonster.defense);
    $("#prompt").append("The monster did " + currentMonster.attack + " damage!" + "<br>");
    if (currentMonster.hp < 1) {
      $("#prompt").append("You killed the monster" + "<br>");
      $('#attack').hide();
      $('#up').show();
      $('#left').show();
      $('#down').show();
      $('#right').show();
      switch (currentMonster) {
        case goblin1:
          console.log(goblin1)
          area[goblin1.currentPosition.y][goblin1.currentPosition.x] = 1;
          $('#tile' + goblin1.currentPosition.y + goblin1.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");;
          break;
        case goblin2:
          console.log(goblin2)
          area[goblin2.currentPosition.y][goblin2.currentPosition.x] = 1;
          $('#tile' + goblin2.currentPosition.y + goblin2.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");;
          break;
        case orc:
          area[orc.currentPosition.y][orc.currentPosition.x] = 5;
          console.log(area[0][3]);
          bossDefeated = true;
          $('#tile03').html("<img src='assets\\images\\chest.png' id='chest' alt='chest' width='40px'/>");
          var treasure = new Audio('assets\\sound\\treasure.mp3')
          treasure.play();
          break;
        default:
          break;
      }
      break;
    } else if (hero.hp < 1) {
      $("#prompt").append("You died" + "<br>");
      area[hero.currentPosition.y][hero.currentPosition.x] = 1;
      $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
      break;
    }
    break;
  }
};

var checkArea = function(x, y) {

  currentRep = area[y][x];
  if (currentRep === 1) {
    return true;
  } else if (currentRep === 0) {
    var wall = new Audio('assets/sound/wall.mp3');
    wall.play();
    $("#prompt").append("There is a wall here!" + "<br>")
    return false;
  } else if (currentRep === 2 || currentRep === 3) {
    $("#prompt").append("There is a monster here." + "<br>");
    $('#flee').show();
    $('#battle').show();
    $('#up').hide();
    $('#left').hide();
    $('#down').hide();
    $('#right').hide();
    currentMonster = {
      x: x,
      y: y
    };
    return false;
  } else if (currentRep === 5) {
    var item = new Audio('assets/sound/item.mp3');
    item.play();
    $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
    $('#tile' + '0' + hero.currentPosition.x).html("<img src='assets\\images\\linktriforce.png' alt='treasure' width='40px'/>")
    $("#prompt").append("You find the treasure!" + "<br>");
    $("#prompt").append("You passed the level!" + "<br>");
    $('#up').hide();
    $('#left').hide();
    $('#down').hide();
    $('#right').hide();
    return true;
  } else {
    var wall = new Audio('assets/sound/wall.mp3');
    wall.play();
    $("#prompt").append("Can't go there!" + "<br>");
    return false;
  };
};

flee = function() {
  $('#attack').hide();
  $('#flee').hide();
  $('#battle').hide();

  $('#up').show();
  $('#left').show();
  $('#down').show();
  $('#right').show();
}

var fight = function() {
  $('#attack').show();
  $('#flee').hide();
  $('#battle').hide();
}

/*Mousetrap.bind('up', function() {
  if (hero.currentPosition.y - 1 > 5 || hero.currentPosition.y - 1 < 0) {
    $("#prompt").append("Can't go there!" + "<br>");
    return false;
  }
  var canMove = checkArea(hero.currentPosition.x, hero.currentPosition.y - 1);
  if (canMove) {
    if (!bossDefeated) {
      area[hero.currentPosition.y][hero.currentPosition.x] = 1;
      $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
      hero.currentPosition.y -= 1;
      area[hero.currentPosition.y][hero.currentPosition.x] = 4;
      $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\link.gif' alt='hero' width='40px'/>");
    } else {}
  } else {}
  break;
});

Mousetrap.bind({
  "right": function() {
    if (hero.currentPosition.x + 1 > 5 || hero.currentPosition.x + 1 < 0) {
      $("#prompt").append("Can't go there!" + "<br>");
      return false;
    }
    var canMove = checkArea(hero.currentPosition.x + 1, hero.currentPosition.y);
    if (canMove) {
      area[hero.currentPosition.y][hero.currentPosition.x] = 1;
      $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
      hero.currentPosition.x += 1;
      area[hero.currentPosition.y][hero.currentPosition.x] = 4;
      $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\link.gif' alt='hero' width='40px'/>");
    } else {
      //$("#promp").append('cant do that' + "<br>");
      //$('#propt').append('')
    }
    break;
  }
});*/

move = function(move) {
  var wall = new Audio('assets/sound/wall.mp3');
  var temp = null;
  $("#instructions").fadeOut("slow", "swing");
  switch (move) {
    case "up":
      if (hero.currentPosition.y - 1 > 5 || hero.currentPosition.y - 1 < 0) {
        wall.play();
        $("#prompt").append("Can't go there!" + "<br>");
        return false;
      }
      var canMove = checkArea(hero.currentPosition.x, hero.currentPosition.y - 1);
      if (canMove) {
        if (!bossDefeated) {
          area[hero.currentPosition.y][hero.currentPosition.x] = 1;
          $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
          hero.currentPosition.y -= 1;
          area[hero.currentPosition.y][hero.currentPosition.x] = 4;
          $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\link.gif' alt='hero' width='40px'/>");
        } else {}
      } else {}
      break;
    case "down":
      if (hero.currentPosition.y + 1 > 4 || hero.currentPosition.y + 1 < 0) {
        wall.play();
        $("#prompt").append("Can't go there!" + "<br>");
        return false;
      }
      var canMove = checkArea(hero.currentPosition.x, hero.currentPosition.y + 1);
      if (canMove) {
        area[hero.currentPosition.y][hero.currentPosition.x] = 1;
        $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
        hero.currentPosition.y += 1;
        area[hero.currentPosition.y][hero.currentPosition.x] = 4;
        $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\link.gif' alt='hero' width='40px'/>");
      } else {
      }
      break;
    case "left":
      if (hero.currentPosition.x - 1 > 5 || hero.currentPosition.x - 1 < 0) {
        wall.play();
        $("#prompt").append("Can't go there!" + "<br>");
        return false;
      }
      var canMove = checkArea(hero.currentPosition.x - 1, hero.currentPosition.y);
      if (canMove) {
        area[hero.currentPosition.y][hero.currentPosition.x] = 1;
        $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
        hero.currentPosition.x -= 1;
        area[hero.currentPosition.y][hero.currentPosition.x] = 4;
        $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\link.gif' alt='hero' width='40px'/>");
      } else {
      }
      break;
      case "right":
        if (hero.currentPosition.x + 1 > 5 || hero.currentPosition.x + 1 < 0) {
          wall.play();
          $("#prompt").append("Can't go there!" + "<br>");
          return false;
        }
        var canMove = checkArea(hero.currentPosition.x + 1, hero.currentPosition.y);
        if (canMove) {
          area[hero.currentPosition.y][hero.currentPosition.x] = 1;
          $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
          hero.currentPosition.x += 1;
          area[hero.currentPosition.y][hero.currentPosition.x] = 4;
          $('#tile' + hero.currentPosition.y + hero.currentPosition.x).html("<img src='assets\\images\\link.gif' alt='hero' width='40px'/>");
        } else {
        }
        break;
    default:
      $("#prompt").append("This command doesn't exist. Please try again." + "<br>");
  };
};
