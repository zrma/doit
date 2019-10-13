package grifts

import (
	"github.com/gobuffalo/buffalo"
	"github.com/zrma/didit/actions"
)

func init() {
	buffalo.Grifts(actions.App())
}
