extends Node2D

const CELL_SIZE := 32
@onready var block_scene: PackedScene = preload("res://scenes/BlockCell.tscn")

# 7種俄羅斯方塊形狀（用相對座標表示）
var shapes := [
	[Vector2(0,0), Vector2(1,0), Vector2(-1,0), Vector2(-2,0)], # I
	[Vector2(0,0), Vector2(1,0), Vector2(0,1), Vector2(1,1)],   # O
	[Vector2(0,0), Vector2(-1,0), Vector2(1,0), Vector2(0,1)],  # T
	[Vector2(0,0), Vector2(-1,0), Vector2(0,1), Vector2(1,1)],  # S
	[Vector2(0,0), Vector2(1,0), Vector2(0,1), Vector2(-1,1)],  # Z
	[Vector2(0,0), Vector2(-1,0), Vector2(-1,1), Vector2(1,0)], # L
	[Vector2(0,0), Vector2(1,0), Vector2(1,1), Vector2(-1,0)]   # J
]

var shape: Array = []
var blocks: Array = []
var grid_pos: Vector2 = Vector2(4, 0)   # 棋盤座標，不是像素
var board_ref: Node = null
var fall_timer := 0.0
var fall_speed := 0.5
var color := Color(1, 1, 1)

func start(board: Node) -> void:
	board_ref = board
	shape = shapes[randi() % shapes.size()]
	color = Color(randf(), randf(), randf())
	
	for c in shape:
		var b = block_scene.instantiate()
		add_child(b)
		b.set_cell_color(color)
		b.set_size(CELL_SIZE)
		blocks.append(b)
	
	update_blocks()
	print("Tetromino started:", shape, "pos=", grid_pos)

func _process(delta: float) -> void:
	if board_ref == null:
		return
	
	fall_timer += delta
	if fall_timer >= fall_speed:
		move(Vector2(0, 1))
		fall_timer = 0.0

	# 鍵盤控制
	if Input.is_action_just_pressed("ui_left"):
		move(Vector2(-1, 0))
	elif Input.is_action_just_pressed("ui_right"):
		move(Vector2(1, 0))
	elif Input.is_action_just_pressed("ui_down"):
		move(Vector2(0, 1))
	elif Input.is_action_just_pressed("ui_accept"):
		rotate_shape()

func move(dir: Vector2) -> void:
	var new_pos = grid_pos + dir
	if board_ref != null and board_ref.has_method("is_valid_position"):
		if board_ref.is_valid_position(shape, new_pos):
			grid_pos = new_pos
			update_blocks()
		else:
			# 下移失敗，代表方塊到底
			if dir == Vector2(0, 1):
				board_ref.lock_tetromino(self)
	else:
		# 沒棋盤時（測試場景）
		grid_pos = new_pos
		update_blocks()

func update_blocks() -> void:
	for i in range(blocks.size()):
		var rel = shape[i]
		var px = (grid_pos.x + rel.x) * CELL_SIZE
		var py = (grid_pos.y + rel.y) * CELL_SIZE
		blocks[i].position = Vector2(px, py)

func rotate_shape() -> void:
	var rotated = []
	for v in shape:
		rotated.append(Vector2(-v.y, v.x))  # 旋轉90度
	if board_ref == null or board_ref.is_valid_position(rotated, grid_pos):
		shape = rotated
		update_blocks()
