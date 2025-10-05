extends Node2D

@onready var tetromino_scene: PackedScene = preload("res://scenes/Tetromino.tscn")
var t: Node2D

func _ready() -> void:
	randomize()
	t = tetromino_scene.instantiate() as Node2D
	add_child(t)
	var shape = [Vector2(0,0), Vector2(-1,0), Vector2(1,0), Vector2(0,1)]
	if t.has_method("start"):
		t.start(shape, Vector2(4,1), null)
		t.set_color(Color(0.8,0.2,0.2))
	else:
		print("ERROR: tetromino instance missing start()")

func _process(delta: float) -> void:
	if not t:
		return
	# 建議先在 Project Settings -> Input Map 新增這些 action 並綁定鍵
	if Input.is_action_just_pressed("move_left"):
		t.move_by(Vector2(-1,0))
		print("move_left pressed")
	if Input.is_action_just_pressed("move_right"):
		t.move_by(Vector2(1,0))
		print("move_right pressed")
	if Input.is_action_just_pressed("soft_drop"):
		t.move_by(Vector2(0,1))
		print("soft_drop pressed")
