<?php

namespace App\Exports;

use App\Operativo;
// use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;

class OperativosExport implements FromView
{
    use Exportable;
    public function __construct(String $dateInicio,String $dateFin)
    {
        $this->dateInicio = $dateInicio;
        $this->dateFin = $dateFin;
    }

    public function view(): View
    {
        $operativos = Operativo::whereBetween('fechaOperativo',[$this->dateInicio,$this->dateFin])->orderBy('fechaOperativo','ASC')->get();
        $operativos->load('vehiculo');
        $operativos->load('choferes');
        return view('exports.operativos', compact('operativos'));
    }
}
