<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Division;
class DivisionController extends Controller
{


    public function buatDivision() {
        Division::create([
            "name" => "required"
        ]);

        return response()->json([
            "status" => true,
            "message" => "Division Berhasil DiBuat"
        ]);
    }
}
