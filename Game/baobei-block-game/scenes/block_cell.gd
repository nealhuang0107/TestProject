extends Node2D

var color: Color = Color(1, 1, 1)
var cell_size: int = 32

func _ready():
	if color == Color(1,1,1):
		color = Color(randf(), randf(), randf())
	queue_redraw()

func _draw():
	var rect = Rect2(-cell_size/2, -cell_size/2, cell_size, cell_size)
	draw_rect(rect, color)

func set_cell_color(c: Color) -> void:
	color = c
	queue_redraw()

func set_size(s: int) -> void:
	cell_size = s
	queue_redraw()
